import { ChangeEvent, FormEvent, useState } from "react"
import { useCreateUserMutation } from "../graphql/generated"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { Container } from "../styles/Signup"
import { Avatar } from "./Avatar"

const images = ['intj', 'entj', 'intp', 'entp', 'istp', 'estp', 'isfp', 'esfp']

export function Signup(){
    const [ name, setName ] = useState('')
    const [ role, setRole ] = useState('')
    const [ avatar, setAvatar ] = useState('intj')
    const { updateCurrentUser } = useCurrentUser()

    const [ createUser ] = useCreateUserMutation()
    
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

    function handleAvatarSelection(selectedAvatar: string){
        setAvatar(selectedAvatar)
    }

    function handleEmptyField(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('Este campo é obrigatório')
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('')
        setName(event.target.value)
    }

    function handleRoleChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('')
        setRole(event.target.value)
    }

    return (
        <Container onSubmit={handleCreateNewUser}>
            <h2>Criar Cadastro</h2>

            <input
                required              
                onInvalid={handleEmptyField}
                onChange={handleNameChange}
                type="text"
                placeholder="Nome"
            />

            <input
                required              
                onInvalid={handleEmptyField}
                onChange={handleRoleChange}
                type="text"
                placeholder="Especialidade"
            />

            <div className="avatarSelector">
                <h3>Selecione o seu avatar:</h3>
                <div className="avatarImgs">
                    {images.map((image) => (
                        <Avatar
                            key={image}
                            onClick={() => handleAvatarSelection(image)}
                            src={`src/assets/avatars/${image}.svg`}
                            hasBorder={image === avatar}
                        />
                    ))}
                </div>          
            </div>

            <button type="submit">Cadastrar</button>
        </Container>
    )
}