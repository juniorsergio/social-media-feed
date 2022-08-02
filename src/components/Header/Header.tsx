import { Link } from 'phosphor-react'
import igniteLogo from '../../assets/ignite-logo.svg'
import { Container } from './styles'

export function Header(){
    return (
        <Container>
            <a href='https://github.com/juniorsergio/social-media-feed' target='blank'>
                <img src={igniteLogo} alt="Logotipo do ignite" />
                Veja esse projeto no GitHub
                <Link size={'1rem'} />
            </a>
        </Container>
    )
}