import { FormEvent, useState } from 'react'
import { Trash } from 'phosphor-react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useCreateCommentMutation, useDeletePostByIdMutation } from '../../graphql/generated'
import { useCurrentUser, User } from '../../hooks/useCurrentUser'
import { useFeed } from '../../hooks/useFeed'

import { Avatar } from '../Avatar/Avatar'
import { Comment } from '../Comment/Comment'
import { TextArea } from '../TextArea/TextArea'

import { Container } from './styles'

interface Comment {
    id: string
}

interface PostProps {  
    postId: string,
    content: string,
    publicationTime: Date,
    author: User,
    comments: Comment[]
}

export function Post({ postId, content, publicationTime, author, comments }: PostProps) {
    const { currentUser } = useCurrentUser()
    const { feed, updateFeed } = useFeed()

    const [ storedComments, setStoredComments ] = useState(comments)

    const [ writeNewComment ] = useCreateCommentMutation()
    const [ deletePost ] = useDeletePostByIdMutation()

    const hasPermissionToDelete = (author?.id === currentUser.id)
    const publishedAt = new Date(publicationTime)

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
                "authorId": currentUser.id,
                "postId": postId
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
               
        const postsWithoutDeletedOne = feed.filter(post => post.id !== postId)
        updateFeed('delete', postsWithoutDeletedOne)
    }

    function deleteComment(id: string){
        const commentsWithoutDeletedOne = storedComments.filter(comment => comment.id !== id)
        setStoredComments(commentsWithoutDeletedOne)
    }
    
    return (
        <Container>
            <header>
                <div className='author'>
                    <Avatar src={author.avatar} />
                    <div className='authorInfo'>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

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

            <p>{content}</p>

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