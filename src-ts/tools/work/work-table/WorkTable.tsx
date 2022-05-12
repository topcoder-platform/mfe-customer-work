import { FC, useContext } from 'react'
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom'

import { cacheChallengeId } from '../../../../src/autoSaveBeforeLogin' // TODO: move to src-ts
import {
    LoadingSpinner,
    routeRoot,
    Table, Work,
    workContext,
    WorkContextData,
    workFactoryGetStatusFilter,
    WorkStatus,
} from '../../../lib'

import { workListColumns } from './work-table.config'
import styles from './WorkTable.module.scss'

const WorkTable: FC<{}> = () => {

    const workContextData: WorkContextData = useContext(workContext)
    const { hasWork, work, initialized }: WorkContextData = workContextData
    const { statusKey }: Readonly<Params<string>> = useParams()
    const navigate: NavigateFunction = useNavigate()

    // get the selected status filter
    const workStatusFilter: WorkStatus | undefined = workFactoryGetStatusFilter(statusKey)

    // if there was a statuskey passed
    // but we couldn't find a corresponding workstatus,
    // redirect to the dashboard
    if (!!statusKey && !workStatusFilter) {
        navigate(routeRoot)
        return <></>
    }

    if (!initialized) {
        return (
            <div className={styles.loader}>
                <LoadingSpinner />
            </div>
        )
    }

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

    // if there is a workstatusfilter, filter the results;
    // sort by the default sort,
    // which is descending by created date
    const workList: Array<Work> = work
        .filter(w => !!workStatusFilter && w.status === workStatusFilter)
        .sort((a: Work, b: Work) => b.created.getTime() - a.created.getTime())

    return hasWork ? (
        <Table
            columns={workListColumns}
            data={workList}
            onRowClick={viewWorkDetails}
        />
    ) : (
        <div className={styles['start-message']}>
            <div className='body-large'>
                Your future work will live here. Let's go!
            </div>
        </div>
    )
}

export default WorkTable
