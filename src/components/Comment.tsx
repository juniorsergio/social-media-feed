import { useState } from 'react'
import { ThumbsUp, Trash } from 'phosphor-react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { useDeleteCommentByIdMutation, useGetCommentByIdQuery, useUpdateCommentLikesMutation } from '../graphql/generated'

import { Container, CommentBox, CommentContent } from '../styles/Comment'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { User } from './Post'
import ReactLoading from 'react-loading'

interface Comment {
    id: string,
    content: string,
    publicationTime: Date,
    likes: number
    author?: User | null,
    post?: {
        id: string
    } | null
}

interface CommentProps {
    commentId: string,
    onDeleteComment: (content: string) => void
}

export function Comment ({ commentId, onDeleteComment }: CommentProps) {
    const { currentUser } = useCurrentUser()
    const [ likeCount, setLikeCount ] = useState(0)
    const [ comment, setComment ] = useState({} as Comment)

    const [ updateCommentLikes ] = useUpdateCommentLikesMutation()
    const [ deleteComment ] = useDeleteCommentByIdMutation()
    
    const { loading } = useGetCommentByIdQuery({
        variables: {
            'id': commentId
        },
        onCompleted: (data) => {
            if (!data || !data.comment) return
            setComment(data.comment)
            setLikeCount(data.comment.likes)
        }
    })

    if (loading || !comment.author || !comment.post) {
        return (
            <ReactLoading
                type="balls"
                color="var(--green-500)" 
                height={100}
                width={50}
            />
        )
    }

    const hasPermissionToDelete = (comment.author.id === currentUser || comment.post.id === currentUser)
    const publishedAt = new Date(comment.publicationTime)

    const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR
    })

    async function handleDeleteComment(){
        await deleteComment({
            variables: {
                'id': commentId
            }
        })
        
        onDeleteComment(commentId)
    }

    async function handleLikeComment(){
        const id = comment.id
        const likes = likeCount + 1
        setLikeCount(likes)
        
        await updateCommentLikes({
            variables: {
                likes,
                id
            }
        })
    }

    return (
        <Container>
            <Avatar hasBorder={false} src={comment.author.avatar} />

            <CommentBox>
                <CommentContent>
                    <header>
                        <div className='authorAndTime'>
                            <strong title={comment.author.role}>{comment.author.name}</strong>
                            <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
                                Cerca de {publishedDateRelativeToNow} atrás
                            </time>
                        </div>

                        <button
                            hidden={!hasPermissionToDelete}
                            onClick={handleDeleteComment}
                            title='Deletar comentário'
                        >
                            <Trash size={24} />
                        </button>
                    </header>

                    <p>{comment.content}</p>
                </CommentContent>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp size={20} />
                        Aplaudir • {likeCount}
                    </button>
                </footer>
            </CommentBox>
        </Container>
    )
}