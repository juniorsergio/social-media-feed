import Cookies from "js-cookie";
import { createContext, ReactNode, useContext, useState } from "react";

interface CurrentUserProviderProps {
    children: ReactNode
}

interface CurrentUserContextData {
    currentUser: string,
    updateCurrentUser: (id: string) => void
}

const CurrentUserContext = createContext<CurrentUserContextData>(
    {} as CurrentUserContextData
)

export function CurrentUserProvider(props: CurrentUserProviderProps) {
	const userCookie = Cookies.get('userId') ?? ''
	const [ currentUser, setCurrentUser ] = useState(userCookie)

    function updateCurrentUser(id: string){
        setCurrentUser(id)
        Cookies.set('userId', id)
    }

    return (
        <CurrentUserContext.Provider value={{currentUser, updateCurrentUser}}>
            {props.children}
        </CurrentUserContext.Provider>
    )
}

export function useCurrentUser(){
    const context = useContext(CurrentUserContext)
    return context
}