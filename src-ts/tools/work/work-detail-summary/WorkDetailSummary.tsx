import { FC, useContext } from 'react'

import { Work, workContext, WorkContextData } from '../../../lib'

import { WorkDetailHighlights } from './WorkDetailHighlights'
import { WorkDetailProgress } from './WorkDetailProgress'

interface WorkDetailSummaryProps {
    challenge: any
}

const WorkDetailSummary: FC<WorkDetailSummaryProps> = (props: WorkDetailSummaryProps) => {

    const workContextData: WorkContextData = useContext(workContext)
    const work: Work = workContextData.createFromChallenge(props.challenge)

    return (
        <>
            <WorkDetailProgress {...work.progress} />
            <WorkDetailHighlights work={work} />
        </>
    )
}

export default WorkDetailSummary
