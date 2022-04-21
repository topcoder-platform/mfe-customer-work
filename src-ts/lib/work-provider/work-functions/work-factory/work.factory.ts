import moment from 'moment'

import { Challenge, ChallengeMetadata } from '../work-store'

import { ChallengeStatus } from './challenge-status.enum'
import { WorkStatus } from './work-status.enum'
import { WorkType } from './work-type.enum'
import { Work } from './work.model'

export function create(challenge: Challenge): Work {

    const status: WorkStatus = getStatus(challenge)
    const type: WorkType = getType(challenge)

    return {
        cost: challenge.cost || Math.random() * 1250, // TODO: real cost
        created: new Date(challenge.created),
        description: getDescription(challenge, type),
        id: challenge.id,
        messageCount: Number((Math.random() * 10).toFixed(0)), // TODO: real message count
        solutionsReady: getSolutionsReadyDate(challenge, status),
        status,
        title: challenge.name,
        type,
    }
}

function findMetadata(challenge: Challenge, metadataName: string): ChallengeMetadata | undefined {
    return challenge.metadata?.find((item: ChallengeMetadata) => item.name === metadataName)
}

function getDescription(challenge: Challenge, type: WorkType): string | undefined {

    switch (type) {

        case WorkType.data:
            return findMetadata(challenge, 'goals')?.value

        case WorkType.design:
            return findMetadata(challenge, 'websitePurpose.description')?.value
    }
}

function getSolutionsReadyDate(challenge: { [prop: string]: any }, status: WorkStatus): Date | undefined {

    if (status === WorkStatus.draft) {
        return undefined
    }

    const readyPhase: any = challenge.phases.find((phase: any) => phase.name === 'Approval')
        || challenge.phases.find((phase: any) => phase.name === 'Appeals Response')

    if (!readyPhase) {
        return undefined
    }

    if (readyPhase.isOpen || moment(readyPhase.scheduledStartDate).isAfter()) {
        return new Date(readyPhase.scheduledEndDate)
    }

    return new Date(readyPhase.actualEndDate || readyPhase.scheduledEndDate)
}

function getStatus(challenge: Challenge): WorkStatus {

    switch (challenge.status) {

        case ChallengeStatus.new:
            return WorkStatus.draft

        case ChallengeStatus.active:
        case ChallengeStatus.approved:
        case ChallengeStatus.draft:
            return WorkStatus.active

        case ChallengeStatus.completed:
            const customerFeedback: ChallengeMetadata | undefined = findMetadata(challenge, 'customerFeedback')
            return !customerFeedback ? WorkStatus.ready : WorkStatus.done

        case ChallengeStatus.cancelled:
        case ChallengeStatus.cancelledPaymentFailed:
        case ChallengeStatus.cancelledRequirementsInfeasible:
            return WorkStatus.transferred

        default:
            return WorkStatus.deleted
    }
}

function getType(challenge: Challenge): WorkType {

    // get the intake form from the metadata
    const intakeForm: ChallengeMetadata | undefined = findMetadata(challenge, 'intake-form')
    if (!intakeForm) {
        return WorkType.unknown
    }

    // parse the form
    const form: {
        form: {
            workType: {
                selectedWorkTypeDetail: WorkType
            }
        }
    } = JSON.parse(intakeForm.value)

    const workTypeKey: (keyof typeof WorkType) | undefined = Object.entries(WorkType)
        .find(([key, value]) => value === form.form.workType?.selectedWorkTypeDetail)
        ?.[0] as keyof typeof WorkType

    const output: WorkType = !!workTypeKey ? WorkType[workTypeKey] : WorkType.unknown
    return output
}
