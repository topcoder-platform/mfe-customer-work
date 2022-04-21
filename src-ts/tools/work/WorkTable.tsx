import { useNavigate } from '@reach/router' // TODO: switch to react-router-dom
import { FC, useContext } from 'react'

import { cacheChallengeId } from '../../../src/autoSaveBeforeLogin' // TODO: move to src-ts
import { Table, Work, workContext, WorkContextData, WorkStatus } from '../../lib'

import { workListColumns } from './work-table.config'

const WorkTable: FC<{}> = () => {

    const workContextData: WorkContextData = useContext(workContext)
    const { work, initialized }: WorkContextData = workContextData

    if (!initialized) {
        return <></>
    }

    const navigate: any = useNavigate()

    function viewWorkDetails(selectedWork: Work): void {

        const isDraft: boolean = selectedWork.status === WorkStatus.draft

        if (isDraft) {
            cacheChallengeId(selectedWork.id)
        }

        // TODO: get these routes from an object/function that's not hard-coded
        const url: string = isDraft
            ? '/self-service/wizard'
            : `/self-service/work-items/${selectedWork.id}`

        navigate(url)
    }

    // sort by the default sort,
    // which is descending by created date
    const workList: Array<Work> = work
        .sort((a, b) => b.created.getTime() - a.created.getTime())

    return (
        <Table
            columns={workListColumns}
            data={workList}
            onRowClick={viewWorkDetails}
        />
    )
}

export default WorkTable
