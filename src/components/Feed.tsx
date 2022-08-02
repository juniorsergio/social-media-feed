import { FormEvent } from "react"

import { useCreatePostMutation } from "../graphql/generated"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { useFeed } from "../hooks/useFeed"

import { Post } from "./Post"
import { TextArea } from "./TextArea"

export function Feed(){
	const { currentUser } = useCurrentUser()
    const { feed, updateFeed } = useFeed()

    const [ writeNewPost ] = useCreatePostMutation()

    async function handleCreateNewPost(event: FormEvent, newPostContent: string){
        event.preventDefault()

        const response = await writeNewPost({
            variables: {
                "content": newPostContent,
                "publishedAt": new Date(),
                "authorId": currentUser.id,
            }
        })

        if (response.data && response.data.createPost){
            updateFeed('update', [{
                id: response.data.createPost.id,
                content: newPostContent,
                publicationTime: new Date(),
                author: currentUser,
                comments: []
            }])
        }
    }

    return (
        <main>
            <TextArea type={'post'} createNewInputText={handleCreateNewPost} />
            
            {feed.map((post) => 
                <>
                    { post.author && (
                        <Post
                            key={post.id}
                            postId={post.id}
                            content={post.content}
                            publicationTime={post.publicationTime}
                            author={post.author}
                            comments={post.comments}
                        />
                    )}
                </>
            )}
        </main>
    )
}