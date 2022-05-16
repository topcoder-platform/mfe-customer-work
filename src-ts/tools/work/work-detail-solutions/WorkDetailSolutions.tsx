import { FC, useContext } from 'react'

import { Work, workContext, WorkContextData, WorkSolution, WorkStatus } from '../../../lib'

import { WorkSolutionsList } from './work-solutions-list'
import styles from './WorkDetailSolutions.module.scss'

interface WorkDetailSolutionsProps {
    challenge: any
    onDownload: (solutionId: string) => void
    solutions: Array<WorkSolution>
}

const WorkDetailSolutions: FC<WorkDetailSolutionsProps> = (props: WorkDetailSolutionsProps) => {

    const workContextData: WorkContextData = useContext(workContext)
    const work: Work = workContextData.createFromChallenge(props.challenge)

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <h3>
                    Solutions Available for Download
                </h3>
                <p className={'body-small'}>
                    The solutions listed below have met your detailed criteria. They are ranked based on the best solution as determined by Topcoder expert reviewers.
                </p>
            </div>
            <WorkSolutionsList work={work} solutions={props.solutions} onDownload={props.onDownload} />
        </div>
    )
}

export default WorkDetailSolutions
