import classNames from 'classnames'
import { FC, SVGProps } from 'react'
import { Link } from 'react-router-dom'

import '../styles/index.scss'
import { IconOutline } from '../svgs'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonStyle = 'icon' |'link' | 'primary' | 'secondary' | 'tertiary' | 'text'
export type ButtonType = 'button' | 'submit'

export interface ButtonProps {
    readonly buttonStyle?: ButtonStyle
    readonly className?: string
    readonly disable?: boolean
    readonly icon?: FC<SVGProps<SVGSVGElement>>
    readonly label?: string
    readonly onClick?: (event?: any) => void
    readonly route?: string
    readonly size?: ButtonSize
    readonly tabIndex: number
    readonly type?: ButtonType
    readonly url?: string
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {

    const classes: string = getButtonClasses(props)
    const clickHandler: (event?: any) => void = getClickHandler(props)
    const content: JSX.Element = getButtonContent(props)

    // if there is a url, this is a link button
    if (!!props.url) {
        return (
            <a
                className={classes}
                href={props.url}
                onClick={clickHandler}
                tabIndex={props.tabIndex}
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
                to={props.route}
            >
                {content}
            </Link>
        )
    }

    return (
        <button
            className={classes}
            onClick={clickHandler}
            tabIndex={props.tabIndex}
            type={props.type || 'button'}
        >
            {content}
        </button>
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
