import { FC, useContext } from 'react'

import { Form, FormDefinition, formGetInputModel, FormInputModel } from '../form'
import { profileContext, ProfileContextData } from '../profile-provider'

import { ContactSupportFormField } from './contact-support-form.config'
import { ContactSupportRequest } from './contact-support-functions'
import { contactSupportSubmitRequestAsync } from './contact-support-functions/contact-support-store'
import styles from './ContactSupportForm.module.scss'

export interface ContactSupportFormProps {
    formDef: FormDefinition
    onSave: () => void
    workId?: string
}

const ContactSupportForm: FC<ContactSupportFormProps> = (props: ContactSupportFormProps) => {

    const { profile }: ProfileContextData = useContext(profileContext)

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

    async function saveAsync(request: ContactSupportRequest): Promise<void> {
        return contactSupportSubmitRequestAsync(request)
            .then(() => {
                props.onSave()
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
        <>
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
                formDef={props.formDef}
                formValues={profile}
                requestGenerator={generateRequest}
                save={saveAsync}
            />
        </>
    )
}

export default ContactSupportForm
