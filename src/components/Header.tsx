import igniteLogo from '../assets/ignite-logo.svg'
import { Container } from '../styles/Header'

export function Header(){
    return (
        <Container>
            <img src={igniteLogo} alt="Logotipo do ignite" />
        </Container>
    )
}