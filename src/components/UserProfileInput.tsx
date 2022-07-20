import { ChangeEvent, FormEvent, useState } from "react"
import { useCreateUserMutation, useUpdateUserProfileMutation } from "../graphql/generated"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Container } from "../styles/UserProfileInput"
import { Avatar } from "./Avatar"
import { User } from "./Post"

import closeImg from '../assets/close.svg'
const images = ['intj', 'entj', 'intp', 'entp', 'istp', 'estp', 'isfp', 'esfp']

interface UserProfileInputProps {
    type: string,
    userInfo: User,
    onRequestClose?: () => void
}

export function UserProfileInput({ type, userInfo, onRequestClose }: UserProfileInputProps){
    const { currentUser, updateCurrentUser } = useCurrentUser()

    const [ name, setName ] = useState(userInfo.name)
    const [ role, setRole ] = useState(userInfo.role)
    const [ avatar, setAvatar ] = useState(userInfo.avatar)

    const isSignup = (type === 'signup')
    const title = isSignup ? 'Criar Cadastro' : 'Atualizar perfil'
    const buttonText = isSignup ? 'Cadastrar' : 'Atualizar'

    const [ createUser ] = useCreateUserMutation()
    const [ updateUser ] = useUpdateUserProfileMutation()
    
    async function handleCreateNewUser(event: FormEvent) {
        event.preventDefault()
        
        const response = await createUser({
            variables: {
                name,
                role,
                avatar
            }
        })

        if (response.data && response.data.createUserProfile){
            updateCurrentUser(response.data.createUserProfile.id)
        }
    }

    async function handleUpdateUser(event: FormEvent) {
        event.preventDefault()
        
        await updateUser({
            variables: {
                "id": currentUser,
                name,
                role,
                avatar
            }
        })

        if (onRequestClose){
            onRequestClose()
            window.location.reload()
        }
    }

    function handleAvatarSelection(selectedAvatar: string){
        setAvatar(selectedAvatar)
    }

    function handleEmptyField(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('Este campo é obrigatório')
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('')
        setName(event.target.value)
        console.log(event.target.value)
    }

    function handleRoleChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('')
        setRole(event.target.value)
    }

    return (
        <Container
            className={type}
            onSubmit={isSignup ? handleCreateNewUser : handleUpdateUser}
        >
            <button type='button' hidden={isSignup} onClick={onRequestClose} className='react-modal-close'>
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <h2>{title}</h2>

            <input
                required              
                onInvalid={handleEmptyField}
                onChange={handleNameChange}
                type="text"
                placeholder="Nome"
                defaultValue={isSignup ? '' : userInfo.name}
            />

            <input
                required              
                onInvalid={handleEmptyField}
                onChange={handleRoleChange}
                type="text"
                placeholder="Especialidade"
                defaultValue={isSignup ? '' : userInfo.role}
            />

            <div className="avatarSelector">
                <h3>Selecione o seu avatar:</h3>
                <div className="avatarImgs">
                    {images.map((image) => (
                        <Avatar
                            key={image}
                            onClick={() => handleAvatarSelection(image)}
                            src={image}
                            hasBorder={image === avatar}
                        />
                    ))}
                </div>          
            </div>

            <button type="submit">
                {buttonText}
            </button>
        </Container>
    )
}