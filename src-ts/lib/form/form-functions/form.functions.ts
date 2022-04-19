import { FormEvent } from 'react'
import { toast } from 'react-toastify'

import { FormInputModel } from '../form-input.model'

export enum ErrorMessage {
    save = 'Error on save',
    submit = 'Error on submit',
}

export function getInputElement(formElements: HTMLFormControlsCollection, fieldName: string): HTMLInputElement {
    return formElements.namedItem(fieldName) as HTMLInputElement
}

export function getInputModel(inputs: ReadonlyArray<FormInputModel>, fieldName: string): FormInputModel {

    const formField: FormInputModel | undefined = inputs.find(input => input.name === fieldName)

    // if we can't find the input we have a problem
    if (!formField) {
        throw new Error(`There is no input definition for the ${fieldName} field`)
    }

    return formField
}

export function initializeValues<T>(inputs: ReadonlyArray<FormInputModel>, formValues?: T): void {
    inputs
        .filter(input => !input.dirty && !input.touched)
        .forEach(input => {
            input.value = !!(formValues as any)?.hasOwnProperty(input.name)
                ? (formValues as any)[input.name]
                : undefined
        })
}

export function onBlur<T>(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, inputs: ReadonlyArray<FormInputModel>, formValues?: T): void {
    handleFieldEvent<T>(event.target as HTMLInputElement | HTMLTextAreaElement, inputs, 'blur', formValues)
}

export function onChange<T>(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, inputs: ReadonlyArray<FormInputModel>, formValues?: T): void {
    handleFieldEvent<T>(event.target as HTMLInputElement | HTMLTextAreaElement, inputs, 'change', formValues)
}

export function onReset(inputs: ReadonlyArray<FormInputModel>, formValue?: any): void {
    inputs
        .forEach(inputDef => {
            inputDef.dirty = false
            inputDef.touched = false
            inputDef.error = undefined
            inputDef.value = formValue?.[inputDef.name]
        })
}

export async function onSubmitAsync<T>(
    event: FormEvent<HTMLFormElement>,
    inputs: ReadonlyArray<FormInputModel>,
    formName: string,
    formValue: T,
    save: (value: T) => Promise<void>,
    onSuccess?: () => void,
): Promise<void> {

    event.preventDefault()

    // get the dirty fields before we validate b/c validation marks them dirty on submit
    const dirty: FormInputModel | undefined = inputs.find(fieldDef => !!fieldDef.dirty)

    // if there are any validation errors, display a message and stop submitting
    // NOTE: need to check this before we check if the form is dirty bc you
    // could have a form that's not dirty but has errors and you wouldn't
    // want to have it look like the submit succeeded
    const formValues: HTMLFormControlsCollection = (event.target as HTMLFormElement).elements
    const isValid: boolean = validateForm(inputs, formValues, 'submit')
    if (!isValid) {
        return Promise.reject(ErrorMessage.submit)
    }

    // set the properties for the updated T value
    inputs.forEach(field => (formValue as any)[field.name] = field.value)

    // if there are no dirty fields, don't actually perform the save
    const savePromise: Promise<void> = !dirty ? Promise.resolve() : save(formValue)

    return savePromise
        .then(() => {
            toast.success(`Your ${formName} has been saved.`)
            onSuccess?.()
        })
        .catch(error => {
            toast.error(error.response?.data?.result?.content || error.message || error)
            return Promise.reject(ErrorMessage.save)
        })
}

function handleFieldEvent<T>(input: HTMLInputElement | HTMLTextAreaElement, inputs: ReadonlyArray<FormInputModel>, event: 'blur' | 'change', formValues?: T): void {

    // set the dirty and touched flags on the field
    const originalValue: string | undefined = (formValues as any)?.[input.name]

    const inputDef: FormInputModel = getInputModel(inputs, input.name)
    if (event === 'change') {
        inputDef.dirty = input.value !== originalValue
    }
    inputDef.touched = true

    // set the def value
    inputDef.value = input.value

    // now let's validate the field
    const formElements: HTMLFormControlsCollection = (input.form as HTMLFormElement).elements
    validateField(inputDef, formElements, event)
}

function validateField(formInputDef: FormInputModel, formElements: HTMLFormControlsCollection, event: 'blur' | 'change' | 'submit'): void {

    // this is the error the field had before the event took place
    const previousError: string | undefined = formInputDef.error

    formInputDef.validators
        ?.forEach(validator => {

            // if the next error is the same as the previous error, then no need to do anything
            const nextError: string | undefined = validator(formInputDef.value, formElements, formInputDef.dependentField)

            if (previousError === nextError) {
                return
            }

            // the change event has more complicated rules than the other events
            // so handle it separately
            if (event === 'change') {
                validateFieldOnChange(previousError, nextError, formInputDef)
                return
            }

            // this is an on blur or submit event,
            // so if there is no current error for this field,
            // set it to the next error
            if (!formInputDef.error) {
                formInputDef.error = nextError
            }
        })
}

function validateFieldOnChange(previousError: string | undefined, nextError: string | undefined, formInputDef: FormInputModel): void {

    // this is a change event, so don't add errors - only change or remove them

    // if the field no longer has an error, remove the current error and don't do anything else
    if (!nextError) {
        formInputDef.error = undefined
        return
    }

    // if there is no previous error
    // OR
    // if the field already has a current error that is not the next error,
    // then don't set the next error
    // (e.g. if a field has both a required-if-other error and a regex error,
    // show the first error, don't replace it w/the 2nd error)
    if (!previousError || formInputDef.error !== nextError) {
        return
    }

    // there is a previous error for this field,
    // and there is not a current error,
    // so it's now safe to set the current error to the next error
    // (e.g. if a field has a required error then adds a value that
    // causes a regex error, update the error as soon as the value changes,
    // don't wait 'til blur)
    formInputDef.error = nextError
}

function validateForm(inputs: ReadonlyArray<FormInputModel>, formElements: HTMLFormControlsCollection, event: 'blur' | 'change' | 'submit'): boolean {
    const errors: ReadonlyArray<FormInputModel> = inputs
        .filter(formInputDef => {
            formInputDef.dirty = formInputDef.dirty || event === 'submit'
            validateField(formInputDef, formElements, event)
            return !!formInputDef.error
        })
    return !errors.length
}
