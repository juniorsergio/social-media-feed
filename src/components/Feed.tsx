import { FormEvent, useEffect, useState } from "react"
import { useCreatePostMutation, useGetPostsQuery } from "../graphql/generated"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Post } from "./Post"
import { TextArea } from "./TextArea"

interface Posts {
    id: string
}

export function Feed(){
	const { currentUser } = useCurrentUser()
    const [ posts, setPosts ] = useState({} as Posts[])

    const [ writeNewPost ] = useCreatePostMutation()
	const { loading } = useGetPostsQuery({
        onCompleted: (data) => {
            if (!data) return
            setPosts(data.posts)
        }
    })

    if (loading) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        )
    }

    async function handleCreateNewPost(event: FormEvent, newPostContent: string){       
        event.preventDefault()

        const response = await writeNewPost({
            variables: {
                "content": newPostContent,
                "publishedAt": new Date(),
                "authorId": currentUser,
            }
        })

        if (response.data && response.data.createPost){
            setPosts([{
                id: response.data.createPost.id
            }, ...posts])
        }
    }

    function deletePost(id: string){
        const postsWithoutDeletedOne = posts.filter(post => post.id !== id)
        setPosts(postsWithoutDeletedOne)
    }

    return (
        <main>
            <TextArea type={'post'} createNewInputText={handleCreateNewPost} />
            
            {posts.map((post) => (
                <Post
                    key={post.id}
                    postId={post.id}
                    onDeletePost={deletePost}
                />
            ))}
        </main>
    )
}