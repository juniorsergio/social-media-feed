import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useGetPostsLazyQuery } from "../graphql/generated";
import { User } from "./useCurrentUser";

interface FeedProviderProps {
    children: ReactNode
}

interface Comment {
    id: string
}

interface Post {
    id: string,
    content: string,
    publicationTime: Date,
    author?: User | null,
    comments: Comment[]
}

interface FeedContextData {
    isLoadingFeed: boolean,
    feed: Post[],
    updateFeed: (type: string, feed: Post[]) => void
}

const FeedContext = createContext({} as FeedContextData)

function FeedProvider({ children }: FeedProviderProps) {
    const [ feed, setFeed ] = useState({} as Post[])
    const [ loading, setLoading ] = useState(true)
    const [ getPosts ] = useGetPostsLazyQuery()

    async function getPostsData(){
        await getPosts({
            onCompleted: (data) => {
                if (!data || !data.posts) return
                setFeed(data.posts)
                setLoading(false)
            }
        })
    }

    function updateFeed(type: string, post: Post[]){
        if(type === 'update'){
            setFeed([post[0], ...feed])
        }
        else if (type === 'delete'){
            setFeed(post)
        }
    }
    
    useEffect(() => {
        getPostsData()
    }, [])

    return (
        <FeedContext.Provider
            value={{
                isLoadingFeed: loading,
                feed,
                updateFeed
            }}
        >
            {children}
        </FeedContext.Provider>
    )
}

function useFeed(){
    const context = useContext(FeedContext)
    return context
}

export { FeedProvider, useFeed }