import { FC } from 'react'

import { BaseModal, Challenge, Form, FormInputModel } from '../../../../lib'

import { workFeedbackFormDef } from './work-feedback-form.config'

interface WorkFeedbackProps {
    challenge: Challenge
    onClose: () => void
    saveSurvey: (feedback: any) => void
    showSurvey: boolean
}

interface Feedback {
    name: string
    value: string | undefined
}

const WorkFeedback: FC<WorkFeedbackProps> = (props: WorkFeedbackProps) => {

    function requestGenerator(inputs: ReadonlyArray<FormInputModel>): Array<Feedback> {
        return inputs
            .map(input => ({
                name: input.instructions || input.label as string,
                value: input.value,
            }))
    }

    async function saveAsync(feedback: Array<Feedback>): Promise<void> {
        props.saveSurvey(feedback)
        props.onClose()
    }

    return (
        <BaseModal
            open={props.showSurvey}
            onClose={props.onClose}
            size='lg'
            title='How did we do?'
        >
            <Form
                formDef={workFeedbackFormDef}
                requestGenerator={requestGenerator}
                save={saveAsync}
            />
        </BaseModal>
    )
}

export default WorkFeedback
