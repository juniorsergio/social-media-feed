import { PencilLine } from 'phosphor-react'

import { Avatar } from './Avatar'

import { Container } from '../styles/Sidebar'
import { useGetUserByIdQuery } from '../graphql/generated'
import { useCurrentUser } from '../hooks/useCurrentUser'

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
    
    return (
        <Container>
            <img src={`src/assets/covers/${data.userProfile.avatar}.svg`} />

            <div className='profile'>
                <Avatar src={`src/assets/avatars/${data.userProfile.avatar}.svg`} />
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