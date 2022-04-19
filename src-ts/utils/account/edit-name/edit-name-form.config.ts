import { FormDefinition, validatorRequired } from '../../../lib'

export const editNameFormTitle: string = 'Edit Name'

export enum EditNameFieldName {
    firstName = 'firstName',
    lastName = 'lastName',
}

export const editNameFormDef: FormDefinition = {
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
            name: EditNameFieldName.firstName,
            type: 'text',
            validators: [
                validatorRequired,
            ],
        },
        {
            label: 'Last Name',
            name: EditNameFieldName.lastName,
            type: 'text',
            validators: [
                validatorRequired,
            ],
        },
    ],
    shortName: 'Name',
    tabIndexStart: 3,
    title: editNameFormTitle,
}
