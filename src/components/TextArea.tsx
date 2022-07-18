import { ChangeEvent, FormEvent, useState } from "react"
import { Container } from "../styles/TextArea"

interface TextAreaProps {
    type: string,
    createNewInputText: (event: FormEvent, newComment: string) => void
}

export function TextArea({ type, createNewInputText } : TextAreaProps){
    const [ newInputText, setNewInputText ] = useState('')
    const isNewCommentEmpty = (newInputText.length === 0)

    const areaTitle = (type === 'comment') ? 'Deixe seu comentário' : 'Criar publicação'
    const placeholder = (type === 'comment') ? 'Deixe um comentario' : 'O que você gostaria de compartilhar?'
    const buttonText = (type === 'comment') ? 'Comentar' : 'Publicar'
    
    function handleNewCommentInvalid(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('Este campo é obrigatório')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewInputText(event.target.value)
    }

    function handleCreateNewInputText(event: FormEvent){
        createNewInputText(event, newInputText)
        setNewInputText('')
    }

    return (
        <Container onSubmit={handleCreateNewInputText}>
            <strong>{areaTitle}</strong>

            <textarea
                required
                name={type}
                placeholder={placeholder}
                value={newInputText}
                onChange={handleNewCommentChange}
                onInvalid={handleNewCommentInvalid}
            />

            <footer>
                <button type='submit' disabled={isNewCommentEmpty}>{buttonText}</button>
            </footer>
        </Container>
    )
}