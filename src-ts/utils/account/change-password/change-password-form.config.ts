import {
    FormDefinition,
    validatorDoesNotMatchOther,
    validatorMatchOther,
    validatorPassword,
    validatorRequired,
    validatorRequiredIfOther,
} from '../../../lib'

export const changePasswordFormTitle: string = 'Change Password'

export enum ChangePasswordFieldName {
    confirmPassword = 'confirmPassword',
    currentPassword = 'password',
    newPassword = 'newPassword',
}

export const changePasswordFormDef: FormDefinition = {
    buttons: [
        {
            buttonStyle: 'secondary',
            isSave: true,
            label: 'Save',
            size: 'xl',
            type: 'submit',
        },
    ],
    inputs: [
        {
            label: 'Current Password',
            name: ChangePasswordFieldName.currentPassword,
            placeholder: 'Enter your current password',
            type: 'password',
            validators: [
                validatorRequired,
            ],
        },
        {
            dependentField: ChangePasswordFieldName.currentPassword,
            label: 'New Password',
            name: ChangePasswordFieldName.newPassword,
            placeholder: 'Enter your new password',
            type: 'password',
            validators: [
                validatorRequired,
                validatorDoesNotMatchOther,
                validatorPassword,
            ],
        },
        {
            dependentField: ChangePasswordFieldName.newPassword,
            label: 'Confirm Password',
            name: ChangePasswordFieldName.confirmPassword,
            placeholder: 'Re-enter your new password',
            type: 'password',
            validators: [
                validatorRequiredIfOther,
                validatorMatchOther,
            ],
        },
    ],
    shortName: 'Password',
    tabIndexStart: 3,
    title: changePasswordFormTitle,
}
