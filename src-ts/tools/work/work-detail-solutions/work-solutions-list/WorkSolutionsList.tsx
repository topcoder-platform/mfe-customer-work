import moment from 'moment'
import { FC, useMemo } from 'react'

import { Work, WorkSolution, WorkStatus } from '../../../../lib'

import { WorkSolutionsListItem } from './work-solutions-list-item'
import styles from './WorkSolutionsList.module.scss'

interface WorkSolutionsListProps {
    isSolutionsReady: boolean
    onDownload: (solutionId: string) => void
    solutions: Array<WorkSolution>
    work: Work
}

const WorkSolutionsList: FC<WorkSolutionsListProps> = (props: WorkSolutionsListProps) => {

    if (!props.isSolutionsReady || !props.solutions?.length) {
        return (
            <div className={styles['solutions-not-available']}>
                YOUR SOLUTIONS WILL BE AVAILABLE FOR DOWNLOAD ON:
                <br />
                {moment(props.work.solutionsReadyDate).format('MM/DD/YY')}
            </div>
        )
    }

    return (
        <div className={styles['list-wrap']}>
            {props.solutions.map((solution) => (
                <WorkSolutionsListItem solution={solution} key={solution.id} onDownload={props.onDownload}/>
            ))}
        </div>
    )
}

export default WorkSolutionsList
