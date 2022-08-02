import { ImgHTMLAttributes } from 'react'
import { Container } from './styles'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean
}

const modules = import.meta.glob('../../assets/avatars/*.svg', { import: 'default', eager: true })

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
    const path = `../../assets/avatars/${props.src}.svg`
    
    return (
        <Container
            className={hasBorder ? 'withBorder' : ''}
            src={String(modules[path])}
            onClick={props.onClick}
        />
    )
}