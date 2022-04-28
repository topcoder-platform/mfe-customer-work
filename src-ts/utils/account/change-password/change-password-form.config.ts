import {
    FormDefinition,
    FormInputAutocompleteOption,
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
            label: 'Change password',
            size: 'xl',
            type: 'submit',
        },
    ],
    inputs: [
        {
            autocomplete: FormInputAutocompleteOption.current,
            label: 'Current Password',
            name: ChangePasswordFieldName.currentPassword,
            placeholder: 'Enter your current password',
            type: 'password',
            validators: [
                validatorRequired,
            ],
        },
        {
            autocomplete: FormInputAutocompleteOption.new,
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
            autocomplete: FormInputAutocompleteOption.off,
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
