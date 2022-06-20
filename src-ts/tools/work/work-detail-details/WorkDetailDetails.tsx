import { FC } from 'react'

import { WorkDetailDetailsPane } from './work-detail-details-pane'
import { WorkDetailDetailsSidebar } from './work-detail-details-sidebar'
import styles from './WorkDetailDetails.module.scss'

interface WorkDetailDetailsProps {
    formData: {}
}

const WorkDetailDetails: FC<WorkDetailDetailsProps> = (props: WorkDetailDetailsProps) => {
    return (
        <div className={styles['wrap']}>
            <div className={styles['detailsContainer']}>
                <WorkDetailDetailsPane formData={props.formData} />
            </div>
            <WorkDetailDetailsSidebar />
        </div>
    )
}

export default WorkDetailDetails
