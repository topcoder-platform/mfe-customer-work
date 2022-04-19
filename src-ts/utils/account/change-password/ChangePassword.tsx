import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'

import {
    ChangePasswordRequest,
    Form,
    FormDefinition,
    formGetInputModel,
    FormInputModel,
    profileContext,
    ProfileContextData,
    UserProfile,
} from '../../../lib'

import { ChangePasswordFieldName, changePasswordFormDef } from './change-password-form.config'

interface ChangePasswordProps {
    readonly onClose: () => void
}

const ChangePassword: FC<ChangePasswordProps> = (props: ChangePasswordProps) => {

    const profileContextData: ProfileContextData = useContext(profileContext)
    const { profile, changePassword: updatePassword }: ProfileContextData = profileContextData

    const [passwordForm]: [FormDefinition, Dispatch<SetStateAction<FormDefinition>>]
        = useState<FormDefinition>(changePasswordFormDef)

    function requestGenerator(inputs: ReadonlyArray<FormInputModel>): ChangePasswordRequest {
        const password: string = formGetInputModel(inputs, ChangePasswordFieldName.currentPassword).value as string
        const newPassword: string = formGetInputModel(inputs, ChangePasswordFieldName.newPassword).value as string
        return {
            newPassword,
            password,
        }
    }

    function save(updatedPassword: ChangePasswordRequest): Promise<void> {
        return updatePassword((profile as UserProfile).userId, updatedPassword)
            .then(() => {
                props.onClose()
            })
    }

    return (
        <Form
            formDef={passwordForm}
            requestGenerator={requestGenerator}
            resetOnError={true}
            save={save}
            onSuccess={props.onClose}
        />
    )
}

export default ChangePassword
