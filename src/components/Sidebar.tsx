import { PencilLine } from 'phosphor-react'

import { Avatar } from './Avatar'

import { Container } from '../styles/Sidebar'
import { useGetUserByIdQuery } from '../graphql/generated'
import { useCurrentUser } from '../hooks/useCurrentUser'

const modules = import.meta.glob('../assets/covers/*.svg', { import: 'default', eager: true })

export function Sidebar() {
    const { currentUser } = useCurrentUser()
    
    const { data } = useGetUserByIdQuery({
        variables: {
            "id": currentUser
        }
    })

    if (!data || !data.userProfile) {
        return (
            <div>
                <p>Carregando...</p>
            </div>
        )
    }

    const path = `../assets/covers/${data.userProfile.avatar}.svg`
    
    return (
        <Container>
            <img src={String(modules[path])} />

            <div className='profile'>
                <Avatar src={data.userProfile.avatar} />
                <strong>{data.userProfile.name}</strong>
                <span>{data.userProfile.role}</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20} />
                    Editar seu perfil
                </a>
            </footer>
        </Container>
    )
}