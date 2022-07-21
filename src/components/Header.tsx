import igniteLogo from '../assets/ignite-logo.svg'
import { Container } from '../styles/Header'

export function Header(){
    return (
        <Container>
            <img src={igniteLogo} alt="Logotipo do ignite" />
            <a href='https://github.com/juniorsergio/social-media-feed' target='blank'>
                Veja esse projeto no GitHub
            </a>
        </Container>
    )
}