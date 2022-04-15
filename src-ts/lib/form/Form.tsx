import { Dispatch, FocusEvent, FormEvent, SetStateAction, useState } from 'react'

import { Button } from '../button'
import '../styles/index.scss'

import { FormDefinition } from './form-definition.model'
import {
    FormErrorMessage,
    formInitializeValues,
    formOnBlur,
    formOnChange,
    formReset,
    formSubmitAsync,
} from './form-functions'
import { FormInputModel } from './form-input.model'
import { FormInputs } from './form-inputs'
import styles from './Form.module.scss'

interface FormProps<ValueType, RequestType> {
    readonly formDef: FormDefinition
    readonly formValues?: ValueType
    readonly onSuccess?: () => void
    readonly requestGenerator: (inputs: ReadonlyArray<FormInputModel>) => RequestType
    readonly resetOnError: boolean
    readonly save: (value: RequestType) => Promise<void>
}

const Form: <ValueType extends any, RequestType extends any>(props: FormProps<ValueType, RequestType>) => JSX.Element
    = <ValueType extends any, RequestType extends any>(props: FormProps<ValueType, RequestType>) => {

        const [formDef, setFormDef]: [FormDefinition, Dispatch<SetStateAction<FormDefinition>>]
            = useState<FormDefinition>({ ...props.formDef })

        const [formKey, setFormKey]: [number, Dispatch<SetStateAction<number>>]
            = useState<number>(Date.now())

        function onBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void {
            const updatedFormInputs: ReadonlyArray<FormInputModel> = formOnBlur(event, formDef.inputs, props.formValues)
            const updatedFormDef: FormDefinition = {
                ...formDef,
                inputs: [...updatedFormInputs],
            }
            setFormDef(updatedFormDef)
        }

        function onChange(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>): void {
            formOnChange(event, formDef.inputs)
            setFormDef({ ...formDef })
        }

        function onReset(): void {
            formReset(props.formDef.inputs, props.formValues)
            setFormDef({ ...formDef })
            setFormKey(Date.now())
        }

        async function onSubmitAsync(event: FormEvent<HTMLFormElement>): Promise<void> {
            const values: RequestType = props.requestGenerator(formDef.inputs)
            formSubmitAsync<RequestType, void>(event, formDef.inputs, props.formDef.shortName || 'data', values, props.save, props.onSuccess)
                .then(() => {
                    setFormKey(Date.now())
                    formReset(formDef.inputs, props.formValues)
                    setFormDef({ ...formDef })
                })
                .catch((error: FormErrorMessage) => {
                    // only reset on save errors
                    if (props.resetOnError && error === FormErrorMessage.save) {
                        formReset(formDef.inputs, props.formValues)
                        setFormKey(Date.now())
                    }
                    setFormDef({ ...formDef })
                })
        }

        formInitializeValues(formDef.inputs, props.formValues)

        const buttons: Array<JSX.Element> = formDef.buttons
            .map((button, index) => {
                // if this is a reset button, set its onclick to reset
                if (!!button.isReset) {
                    button = {
                        ...button,
                        onClick: onReset,
                    }
                }
                return (
                    <Button
                        {...button}
                        key={button.label}
                        tabIndex={button.notTabble ? -1 : index + formDef.inputs.length + (formDef.tabIndexStart || 0)}
                    />
                )
            })

        return (
            <form
                action={''}
                className={styles.form}
                key={formKey}
                onSubmit={onSubmitAsync}
            >

                {!!props.formDef.title && (
                    <>
                        <h2>{props.formDef.title}</h2>
                        <hr />
                    </>
                )}

                <FormInputs
                    formDef={formDef}
                    onBlur={onBlur}
                    onChange={onChange}
                />

                <div className='button-container-outer'>
                    <div className='button-container-inner'>
                        {buttons}
                    </div>
                </div>

            </form>
        )
    }

export default Form
