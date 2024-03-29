import { PencilLine } from 'phosphor-react'
import { useState } from 'react'
import ReactModal from 'react-modal'

import { useGetUserByIdQuery } from '../../graphql/generated'
import { useCurrentUser } from '../../hooks/useCurrentUser'

import { Avatar } from '../Avatar/Avatar'
import { UserProfileInput } from '../UserProfileInput/UserProfileInput'

import { Container } from './styles'
import ReactLoading from 'react-loading'

const modules = import.meta.glob('../../assets/covers/*.svg', { import: 'default', eager: true })

export function Sidebar() {
    const { currentUser } = useCurrentUser()
    const [ isUpdateUserModalOpen, setIsUpdateUserModalOpen ] = useState(false)
    
    const { data } = useGetUserByIdQuery({
        variables: {
            "id": currentUser.id
        }
    })

    if (!data || !data.userProfile) {
        return (
            <ReactLoading
                type="balls"
                color="var(--green-500)" 
                height={100}
                width={50}
            />
        )
    }

    const path = `../../assets/covers/${data.userProfile.avatar}.svg`

    function handleOpenUpdateUserModal(){
        setIsUpdateUserModalOpen(true)
    }

    function handleCloseUpdateUserModal(){
        setIsUpdateUserModalOpen(false)
    }
    
    return (
        <Container>
            <img src={String(modules[path])} />

            <div className='profile'>
                <Avatar src={data.userProfile.avatar} />
                <strong>{data.userProfile.name}</strong>
                <span>{data.userProfile.role}</span>
            </div>

            <footer>
                <button onClick={handleOpenUpdateUserModal}>
                    <PencilLine size={20} />
                    Editar seu perfil
                </button>
            </footer>

            <ReactModal
                isOpen={isUpdateUserModalOpen}
                onRequestClose={handleCloseUpdateUserModal}
                overlayClassName='react-modal-overlay'
                className='react-modal-content'
                ariaHideApp={false}
            >
                <UserProfileInput
                    type='update'
                    userInfo={data.userProfile}
                    onRequestClose={handleCloseUpdateUserModal}
                />
            </ReactModal >
        </Container>
    )
}