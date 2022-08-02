import Cookies from "js-cookie";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useGetUserByIdLazyQuery } from "../graphql/generated";

interface CurrentUserProviderProps {
    children: ReactNode
}

export interface User {
    id: string,
    name: string,
    role: string,
    avatar: string
}

interface CurrentUserContextData {
    currentUser: User,
    isLoadingUser: boolean,
    updateCurrentUser: (id: string) => void
}

const CurrentUserContext = createContext({} as CurrentUserContextData)

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
	const userCookie = Cookies.get('userId') ?? ''
	const [ currentUser, setCurrentUser ] = useState({} as User)
    const [ loading, setLoading ] = useState(true)
    const [ getUser ] = useGetUserByIdLazyQuery()

    async function getUserData(id: string){
        await getUser({
            variables: {
                id
            },
            onCompleted: (data) => {
                if (!data || !data.userProfile) return
                setCurrentUser(data.userProfile)
                setLoading(false)
            }
        })
    }

    function updateCurrentUser(id: string){
        getUserData(id)
        Cookies.set('userId', id)
    }

    useEffect(() => {
        if (userCookie !== ''){
            getUserData(userCookie)
        }
    }, [])

    return (
        <CurrentUserContext.Provider value={{
            currentUser,
            isLoadingUser: loading,
            updateCurrentUser
        }}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export function useCurrentUser(){
    const context = useContext(CurrentUserContext)
    return context
}