import { Dispatch, FC, useContext, useEffect, useState } from 'react'
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom'

import { cacheChallengeId } from '../../../../src/autoSaveBeforeLogin' // TODO: move to src-ts
import {
    LoadingSpinner,
    routeRoot,
    Table,
    TableColumn,
    Work,
    workContext,
    WorkContextData,
    workGetFilteredByStatus,
    workGetStatusFilter,
    WorkStatus,
    WorkStatusFilter,
} from '../../../lib'

import { WorkNoResults } from './work-no-results'
import { WorkListColumnField, workListColumns } from './work-table.config'
import styles from './WorkTable.module.scss'

const WorkTable: FC<{}> = () => {

    const workContextData: WorkContextData = useContext(workContext)
    const { hasWork, work, initialized }: WorkContextData = workContextData

    const [columns, setColumns]: [ReadonlyArray<TableColumn<Work>>, Dispatch<ReadonlyArray<TableColumn<Work>>>]
        = useState<ReadonlyArray<TableColumn<Work>>>([...workListColumns])

    const { statusKey }: Readonly<Params<string>> = useParams()
    const workStatusFilter: WorkStatusFilter | undefined = workGetStatusFilter(statusKey)

    const navigate: NavigateFunction = useNavigate()

    // it's super annoying that you have to define this hook before the conditionals
    // to return non-table results, but just another joy of react
    useEffect(() => {

        // if we have a status filter, remove the status column
        if (!!workStatusFilter && workStatusFilter !== WorkStatusFilter.all) {
            const filteredColumns: Array<TableColumn<Work>> = [...columns]
            filteredColumns.splice(columns.findIndex(c => c.label === WorkListColumnField.status), 1)
            setColumns(filteredColumns)

        } else {
            // set the columns to the original
            setColumns([...workListColumns])
        }
    }, [
        workStatusFilter,
    ])

    // if there was a statuskey passed
    // but we couldn't find a corresponding workstatusfilter,
    // redirect to the dashboard
    if (!!statusKey && !workStatusFilter) {
        navigate(routeRoot)
        return <></>
    }

    // if we haven't loaded the work yet, render the spinner
    if (!initialized) {
        return (
            <div className={styles.loader}>
                <LoadingSpinner />
            </div>
        )
    }

    // if we don't have any work at all, render the future work UI
    if (!hasWork) {
        return <WorkNoResults filtered={false} />
    }

    // get the filtered/sorted list
    const workList: Array<Work> = workGetFilteredByStatus(work, workStatusFilter)
        // sort by the default sort,
        // which is descending by created date
        .sort((a: Work, b: Work) => b.created.getTime() - a.created.getTime())

    // if we don't have any work after filtering, render the empty results
    if (!workList.length) {
        return <WorkNoResults filtered={true} />
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

    return (
        <Table
            columns={columns}
            data={workList}
            onRowClick={viewWorkDetails}
        />
    )
}

export default WorkTable
