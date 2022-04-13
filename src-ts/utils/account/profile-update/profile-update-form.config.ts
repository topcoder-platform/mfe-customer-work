import { FormDefinition, validatorEmail, validatorRequired } from '../../../lib'

export const profileFormTitle: string = 'Basic Information'

export enum ProfileFieldName {
    email = 'email',
    firstName = 'firstName',
    handle = 'handle',
    lastName = 'lastName',
}

export const profileFormDef: FormDefinition = {
    buttons: [
        {
            buttonStyle: 'secondary',
            isSave: true,
            label: 'Save',
            size: 'lg',
            type: 'submit',
        },
    ],
    inputs: [
        {
            label: 'First Name',
            name: ProfileFieldName.firstName,
            type: 'text',
            validateOnChange: [
                validatorRequired,
            ],
        },
        {
            label: 'Last Name',
            name: ProfileFieldName.lastName,
            type: 'text',
            validateOnChange: [
                validatorRequired,
            ],
        },
    ],
    tabIndexStart: 3,
    title: profileFormTitle,
}
