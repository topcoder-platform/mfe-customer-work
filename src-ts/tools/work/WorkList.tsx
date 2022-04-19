import { useNavigate } from '@reach/router' // TODO: switch to react-router-dom
import { FC } from 'react'

import { cacheChallengeId } from '../../../src/autoSaveBeforeLogin' // TODO: move to src-ts
import { Table } from '../../lib'

import { Challenge, Work, workCreate, WorkStatus } from './work-functions'
import { workListColumns } from './work-list.config'

interface WorkListProps {
    challenges: Array<Challenge>
}

const WorkList: FC<WorkListProps> = (props: WorkListProps) => {

    const navigate: any = useNavigate()

    function viewWorkDetails(work: Work): void {

        const isDraft: boolean = work.status === WorkStatus.draft

        if (isDraft) {
            cacheChallengeId(work.id)
        }

        // TODO: get these routes from an object/function that's not hard-coded
        const url: string = isDraft
            ? '/self-service/wizard'
            : `/self-service/work-items/${work.id}`

        navigate(url)
    }

    // filter out deleted items,
    // run the raw challenges through the factory,
    // and sort by the default sort,
    // which is descending by created date
    const workList: Array<Work> = props.challenges
        .map(challenge => workCreate(challenge))
        .filter(work => work.status !== WorkStatus.deleted)
        .sort((a, b) => b.created.getTime() - a.created.getTime())

    return (
        <Table
            columns={workListColumns}
            data={workList}
            onRowClick={viewWorkDetails}
        />
    )
}

export default WorkList
