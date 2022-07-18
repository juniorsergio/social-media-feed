import { FormEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import { Container } from '../styles/Post'
import { useCreateCommentMutation, useDeletePostByIdMutation, useGetPostByIdQuery } from '../graphql/generated'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { TextArea } from './TextArea'
import { Trash } from 'phosphor-react'

interface Comments {
    id: string
}

export interface Author {
    id: string,
    name: string,
    role: string,
    avatar: string
}

interface Post {
    id: string,
    content: string,
    publicationTime: Date,
    author?: Author | null
}

interface PostProps {  
    postId: string,
    onDeletePost: (postId: string) => void
}

export function Post({ postId, onDeletePost }: PostProps) {
    const { currentUser } = useCurrentUser()
    const [ storedComments, setStoredComments ] = useState({} as Comments[])
    const [ post, setPost ] = useState({} as Post)

    const [ writeNewComment ] = useCreateCommentMutation()
    const [ deletePost ] = useDeletePostByIdMutation()

    const { loading } = useGetPostByIdQuery({
        variables: {
            'id': postId
        },
        onCompleted: (data) => {
            if (!data || !data.post) return
            setPost(data.post)
            setStoredComments(data.post.comments)
        }
    })

    if (loading) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        )
    }

    const hasPermissionToDelete = (post.author?.id === currentUser)
    const publishedAt = new Date(post.publicationTime)

    const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    async function handleCreateNewComment(event: FormEvent, newComment: string){       
        event.preventDefault()

        const response = await writeNewComment({
            variables: {
                "content": newComment,
                "publishedAt": new Date(),
                "authorId": currentUser,
                "postId": post.id
            }
        })

        if (response.data && response.data.createComment){
            setStoredComments([{
                id: response.data.createComment.id
            }, ...storedComments])
        }
    }

    async function handleDeletePost(){
        await deletePost({
            variables: {
                'id': postId
            }
        })
        
        onDeletePost(postId)
    }

    function deleteComment(id: string){
        const commentsWithoutDeletedOne = storedComments.filter(comment => comment.id !== id)
        setStoredComments(commentsWithoutDeletedOne)
    }
    
    return (
        <Container>
            <header>
                {post.author && (                   
                    <div className='author'>
                        <Avatar src={`src/assets/avatars/${post.author.avatar}.svg`} />
                        <div className='authorInfo'>
                            <strong>{post.author.name}</strong>
                            <span>{post.author.role}</span>
                        </div>
                    </div>
                )}

                <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
                    Publicado {publishedDateRelativeToNow}
                </time>

                <button
                    hidden={!hasPermissionToDelete}
                    onClick={handleDeletePost}
                    title='Deletar comentário'
                >
                    <Trash size={24} />
                </button>
            </header>

            <p>{post.content}</p>

            <TextArea type={'comment'} createNewInputText={handleCreateNewComment} />

            <div className='commentList'>
                {storedComments.map((comment) => (
                    <Comment
                        key={comment.id}
                        commentId={comment.id}
                        onDeleteComment={deleteComment}
                    />
                ))}
            </div>
        </Container>
    )
}