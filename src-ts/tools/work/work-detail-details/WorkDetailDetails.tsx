import { FC } from 'react'

import { WorkDetailDetailsSidebar } from './work-detail-details-sidebar'
import styles from './WorkDetailDetails.module.scss'

interface WorkDetailDetailsProps {
    children: JSX.Element
}

const WorkDetailDetails: FC<WorkDetailDetailsProps> = (props: WorkDetailDetailsProps) => {

    return (
        <div className={styles['wrap']}>
            <div className={styles['details-content']}>
                {props.children}
            </div>
            <WorkDetailDetailsSidebar />
        </div>
    )
}

export default WorkDetailDetails
