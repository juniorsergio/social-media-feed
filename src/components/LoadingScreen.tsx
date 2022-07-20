import reactLogo from '../assets/react.svg'
import { Container } from '../styles/LoadingScreen'

export function LoadingScreen(){
    return (
        <Container>
            <img src={reactLogo} alt="React logo" />
            <p>Bem Vindo(a)!</p>
        </Container>
    )
}