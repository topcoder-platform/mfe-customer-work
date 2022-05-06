import { FC, ReactNode, useContext } from 'react'

import { Work, workContext, WorkContextData, WorkStatus } from '../../../lib'

import { WorkDetailHighlights } from './WorkDetailHighlights'
import { WorkDetailProgress } from './WorkDetailProgress'
import { WorkTransferredStatus } from './WorkTransferredStatus'

interface WorkDetailSummaryProps {
    challenge: any
    status?: WorkStatus
}

const WorkDetailSummary: FC<WorkDetailSummaryProps> = (props: WorkDetailSummaryProps) => {

    const workContextData: WorkContextData = useContext(workContext)
    const work: Work = workContextData.createFromChallenge(props.challenge)

    return (
        <>
            {props.status === WorkStatus.transferred ? (
                <WorkTransferredStatus />
            ) : (
                <WorkDetailProgress {...work.progress} />
            )}
            <WorkDetailHighlights work={work} />
        </>
    )
}

export default WorkDetailSummary
