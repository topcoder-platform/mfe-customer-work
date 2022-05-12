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

        // if we don't have a status filter, we have a problem,
        // so don't do anything
        if (!workStatusFilter) {
            return
        }

        // if we have the status filter is all, just set the default columns
        if (workStatusFilter === WorkStatusFilter.all) {
            setColumns([...workListColumns])
            return
        }

        const filteredColumns: Array<TableColumn<Work>> = [...columns]
        filteredColumns.splice(columns.findIndex(c => c.label === WorkListColumnField.status), 1)
        setColumns(filteredColumns)
    }, [
        workStatusFilter,
    ])

    // if we couldn't find a workstatusfilter,
    // redirect to the dashboard
    if (!workStatusFilter) {
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

    // if we don't have any work at all, render no results
    if (!hasWork) {
        return <WorkNoResults filtered={false} />
    }

    // get the filtered/sorted list
    const workList: Array<Work> = workGetFilteredByStatus(work, workStatusFilter)
        // sort by the default sort,
        // which is descending by created date
        .sort((a: Work, b: Work) => b.created.getTime() - a.created.getTime())

    // if we don't have any work after filtering, render no results
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
