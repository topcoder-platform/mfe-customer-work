import {
    createRef,
    Dispatch,
    FocusEvent,
    FormEvent,
    RefObject,
    SetStateAction,
    useEffect,
    useState,
} from 'react'

import { Button } from '../button'
import '../styles/index.scss'

import { FormDefinition } from './form-definition.model'
import {
    formInitializeValues,
    formOnBlur,
    formOnChange,
    formOnReset,
    formOnSubmitAsync,
} from './form-functions'
import { FormInputModel } from './form-input.model'
import { FormInputs } from './form-inputs'
import styles from './Form.module.scss'

interface FormProps<ValueType, RequestType> {
    readonly formDef: FormDefinition
    readonly formValues?: ValueType
    readonly onSuccess?: () => void
    readonly requestGenerator: (inputs: ReadonlyArray<FormInputModel>) => RequestType
    readonly save: (value: RequestType) => Promise<void>
}

const Form: <ValueType extends any, RequestType extends any>(props: FormProps<ValueType, RequestType>) => JSX.Element
    = <ValueType extends any, RequestType extends any>(props: FormProps<ValueType, RequestType>) => {

        const [formDef, setFormDef]: [FormDefinition, Dispatch<SetStateAction<FormDefinition>>]
            = useState<FormDefinition>({ ...props.formDef })

        const [formError, setFormError]: [string | undefined, Dispatch<SetStateAction<string | undefined>>]
            = useState<string | undefined>()

        const [formKey, setFormKey]: [number, Dispatch<SetStateAction<number>>]
            = useState<number>(Date.now())

        const [formRef]: [RefObject<HTMLFormElement>, Dispatch<SetStateAction<RefObject<HTMLFormElement>>>]
            = useState<RefObject<HTMLFormElement>>(createRef<HTMLFormElement>())

        function onBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void {
            formOnBlur(event, formDef.inputs, props.formValues)
            setFormDef({ ...formDef })
        }

        function onChange(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>): void {
            formOnChange(event, formDef.inputs, props.formValues)
            setFormDef({ ...formDef })
        }

        function onReset(): void {
            formOnReset(props.formDef.inputs, props.formValues)
            setFormDef({ ...formDef })
            setFormKey(Date.now())
        }

        async function onSubmitAsync(event: FormEvent<HTMLFormElement>): Promise<void> {
            const values: RequestType = props.requestGenerator(formDef.inputs)
            formOnSubmitAsync<RequestType>(event, formDef.inputs, props.formDef.shortName || 'data', values, props.save, props.onSuccess)
                .then(() => {
                    setFormKey(Date.now())
                    formOnReset(formDef.inputs, props.formValues)
                    setFormDef({ ...formDef })
                })
                .catch((error: string | undefined) => {
                    setFormError(error)
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

        // set the max width of the form error so that it doesn't push the width of the form wider
        const buttonsRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
        const errorsRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
        useEffect(() => {
            const formWidth: number = formRef.current?.clientWidth || 0
            const buttonsWidth: number = buttonsRef.current?.clientWidth || 0
            const errorWidth: number = formWidth - buttonsWidth

            // errorsRef current will always exist,
            // but need to to satisfy typescript and check
            if (!!errorsRef.current) {
                errorsRef.current.style.maxWidth = `${errorWidth}px`
            }
        }, [formRef])

        return (
            <form
                action={''}
                className={styles.form}
                key={formKey}
                onSubmit={onSubmitAsync}
                ref={formRef}
            >

                {!!props.formDef.title && (
                    <>
                        <h2>{props.formDef.title}</h2>
                    </>
                )}

                <FormInputs
                    formDef={formDef}
                    onBlur={onBlur}
                    onChange={onChange}
                />

                <div className={styles['form-footer']}>
                    <div
                        className={styles['form-error']}
                        ref={errorsRef}
                    >
                        {formError}
                    </div>
                    <div ref={buttonsRef}>
                        {buttons}
                    </div>
                </div>

            </form>
        )
    }

export default Form
