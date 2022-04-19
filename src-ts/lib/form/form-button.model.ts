import { ButtonSize, ButtonStyle, ButtonType } from '../button'

export interface FormButton {
    readonly buttonStyle?: ButtonStyle
    readonly isReset?: boolean
    readonly isSave?: boolean
    readonly label: string
    readonly notTabble?: boolean
    readonly onClick?: (event?: any) => void
    readonly route?: string
    readonly size?: ButtonSize
    readonly type?: ButtonType
    readonly url?: string
}
