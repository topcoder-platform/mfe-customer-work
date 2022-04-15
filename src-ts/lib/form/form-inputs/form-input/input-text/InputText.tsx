import { FC, FocusEvent } from 'react'

import { FormInputAutocompleteOption } from '../form-input-autcomplete-option.enum'
import { InputWrapper } from '../input-wrapper'

import styles from './InputText.module.scss'

interface InputTextProps {
    readonly autocomplete?: FormInputAutocompleteOption
    readonly dirty?: boolean
    readonly disabled?: boolean
    readonly error?: string
    readonly hint?: string
    readonly label?: string
    readonly name: string
    readonly onBlur: (event: FocusEvent<HTMLInputElement>) => void
    readonly onChange: (event: FocusEvent<HTMLInputElement>) => void
    readonly placeholder?: string
    readonly preventSpellCheck?: boolean
    readonly tabIndex: number
    readonly type: 'password' | 'text'
    readonly value?: string | number
}

const InputText: FC<InputTextProps> = (props: InputTextProps) => {

    return (
        <InputWrapper
            dirty={!!props.dirty}
            disabled={!!props.disabled}
            error={props.error}
            hint={props.hint}
            label={props.label || props.name}
            name={props.name}
        >
            <input
                autoComplete={props.autocomplete}
                className={styles['form-input-text']}
                defaultValue={props.value}
                disabled={!!props.disabled}
                onBlur={props.onBlur}
                onChange={props.onChange}
                name={props.name}
                placeholder={props.placeholder}
                spellCheck={!props.preventSpellCheck}
                tabIndex={props.tabIndex}
                type={props.type || 'text'}
            />
        </InputWrapper>
    )
}

export default InputText
