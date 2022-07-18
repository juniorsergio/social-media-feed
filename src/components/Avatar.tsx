import { ImgHTMLAttributes } from 'react'
import { Container } from '../styles/Avatar'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
    return (
        <Container
            className={hasBorder ? 'withBorder' : ''}
            src={props.src}
            onClick={props.onClick}
        />
    )
}