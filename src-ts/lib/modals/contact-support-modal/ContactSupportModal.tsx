import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'

import { Form, FormDefinition, formGetInputModel, FormInputModel, formOnReset } from '../../form'
import { profileContext, ProfileContextData } from '../../profile-provider'
import { BaseModal } from '../base-modal'

import { contactSupportFormDef, ContactSupportFormField } from './contact-support-form.config'
import { ContactSupportRequest } from './contact-support-functions'
import { contactSupportSubmitRequestAsync } from './contact-support-functions/contact-support-store'
import styles from './ContactSupportModal.module.scss'

export interface ContactSupportModal {
    isOpen: boolean
    onClose: () => void
    workId?: string
}

const ContactSupportModal: FC<ContactSupportModal> = (props: ContactSupportModal) => {

    const { profile }: ProfileContextData = useContext(profileContext)
    const [formDef, setFormDef]: [FormDefinition, Dispatch<SetStateAction<FormDefinition>>] = useState<FormDefinition>({ ...contactSupportFormDef })

    function generateRequest(inputs: ReadonlyArray<FormInputModel>): ContactSupportRequest {
        const firstName: string = formGetInputModel(inputs, ContactSupportFormField.first).value as string
        const lastName: string = formGetInputModel(inputs, ContactSupportFormField.last).value as string
        const email: string = formGetInputModel(inputs, ContactSupportFormField.email).value as string
        const question: string = formGetInputModel(inputs, ContactSupportFormField.question).value as string
        return {
            challengeId: props.workId,
            email,
            firstName,
            isSelfService: true,
            lastName,
            question,
        }
    }

    function onClose(): void {
        const updatedForm: FormDefinition = { ...formDef }
        formOnReset(updatedForm.inputs)
        setFormDef(updatedForm)
        props.onClose()
    }

    async function saveAsync(request: ContactSupportRequest): Promise<void> {
        return contactSupportSubmitRequestAsync(request)
            .then(() => {
                onClose()
            })
    }

    const emailElement: JSX.Element | undefined = !!profile?.email
        ? (
            <>
                &nbsp;at <strong>{profile.email}</strong>
            </>
        )
        : undefined

    return (
        <BaseModal
            onClose={onClose}
            open={props.isOpen}
            size='md'
            title={`We're Here to Help`}
        >
            <div className={styles['contact-support-intro']}>
                <p>
                    Hi {profile?.firstName || 'there'}, we're here to help.
                </p>

                <p>
                    Please describe what you'd like to discuss, and a
                    Topcoder Solutions Expert will email you back
                    {emailElement}
                    &nbsp;within one business day.
                </p>
            </div>

            <Form
                formDef={formDef}
                formValues={profile}
                requestGenerator={generateRequest}
                save={saveAsync}
            />
        </BaseModal>
    )
}

export default ContactSupportModal
