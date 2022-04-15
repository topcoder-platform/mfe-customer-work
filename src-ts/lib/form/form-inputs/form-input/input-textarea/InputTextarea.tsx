import { FC, FocusEvent } from 'react'

import { FormInputAutocompleteOption } from '../form-input-autcomplete-option.enum'
import { InputWrapper } from '../input-wrapper'

import styles from './InputTextarea.module.scss'

interface InputTextareaProps {
    readonly autocomplete?: FormInputAutocompleteOption
    readonly dirty?: boolean
    readonly disabled?: boolean
    readonly error?: string
    readonly hint?: string
    readonly label?: string
    readonly name: string
    readonly onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void
    readonly onChange: (event: FocusEvent<HTMLTextAreaElement>) => void
    readonly placeholder?: string
    readonly tabIndex: number
    readonly value?: string | number
}

const InputTextarea: FC<InputTextareaProps> = (props: InputTextareaProps) => {
    return (
        <InputWrapper
            dirty={!!props.dirty}
            disabled={!!props.disabled}
            error={props.error}
            hint={props.hint}
            label={props.label || props.name}
            name={props.name}
        >
            <textarea
                autoComplete={props.autocomplete}
                className={styles['form-input-textarea']}
                defaultValue={props.value}
                disabled={!!props.disabled}
                name={props.name}
                onBlur={props.onBlur}
                onFocus={props.onChange}
                placeholder={props.placeholder}
                tabIndex={props.tabIndex}
            />
        </InputWrapper>
    )
}

export default InputTextarea
