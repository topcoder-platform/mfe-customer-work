import classNames from 'classnames'
import { FC, SVGProps } from 'react'
import { Link } from 'react-router-dom'

import '../styles/index.scss'
import { IconOutline } from '../svgs'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ButtonStyle = 'icon' | 'link' | 'primary' | 'secondary' | 'tertiary' | 'text'
export type ButtonType = 'button' | 'submit'

export interface ButtonProps {
    readonly buttonStyle?: ButtonStyle
    readonly className?: string
    readonly disable?: boolean
    readonly elementType?: string
    readonly icon?: FC<SVGProps<SVGSVGElement>>
    readonly label?: string
    readonly name?: string
    readonly onClick?: (event?: any) => void
    readonly route?: string
    readonly size?: ButtonSize
    readonly tabIndex?: number
    readonly title?: string
    readonly type?: ButtonType
    readonly url?: string
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {

    const classes: string = getButtonClasses(props)
    const clickHandler: (event?: any) => void = getClickHandler(props)
    const content: JSX.Element = getButtonContent(props)
    const ButtonElement: keyof JSX.IntrinsicElements = (props.elementType ?? 'button') as keyof JSX.IntrinsicElements

    // if there is a url, this is a link button
    if (!!props.url) {
        return (
            <a
                className={classes}
                href={props.url}
                onClick={clickHandler}
                tabIndex={props.tabIndex}
                title={props.title}
            >
                {content}
            </a>
        )
    }

    if (!!props.route) {
        return (
            <Link
                className={classes}
                onClick={clickHandler}
                tabIndex={props.tabIndex}
                title={props.title}
                to={props.route}
            >
                {content}
            </Link>
        )
    }

    return (
        <ButtonElement
            className={classes}
            name={props.name}
            onClick={clickHandler}
            tabIndex={props.tabIndex}
            title={props.title}
            type={props.type || 'button'}
        >
            {content}
        </ButtonElement>
    )
}

function getButtonClasses(props: ButtonProps): string {
    const classes: string = classNames(
        'button',
        props.className,
        props.buttonStyle || 'primary',
        `button-${props.size || 'md'}`,
        !!props.disable ? 'disabled' : undefined
    )
    return classes
}

function getButtonContent(props: ButtonProps): JSX.Element {

    // if this is a link, just add the label and the arrow icon
    if (props.buttonStyle === 'link') {
        return (
            <>
                {props.label}
                <IconOutline.ArrowRightIcon />
            </>
        )
    }

    const Icon: FC<SVGProps<SVGSVGElement>> | undefined = props.icon
    return (
        <>
            {!!Icon && <Icon />}
            {props.label}
        </>
    )
}

function getClickHandler(props: ButtonProps): (event?: any) => void {
    return props.onClick || (() => undefined)
}

export default Button
