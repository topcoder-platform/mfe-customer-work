import { FC } from 'react'

import ReviewTableLegacy from '../../../../src/routes/ReviewLegacy/components/ReviewTableLegacy'
import { WorkType } from '../../../lib'

import { WorkDetailDetailsPane } from './work-detail-details-pane'
import { WorkDetailDetailsSidebar } from './work-detail-details-sidebar'
import styles from './WorkDetailDetails.module.scss'

interface WorkDetailDetailsProps {
    formData: any
}

const WorkDetailDetails: FC<WorkDetailDetailsProps> = (props: WorkDetailDetailsProps) => {
    const workType: WorkType = props.formData?.workType?.selectedWorkType

    return (
        <div className={styles['wrap']}>
            <div className={styles['detailsContainer']}>
                {workType !== WorkType.designLegacy &&
                    <WorkDetailDetailsPane formData={props.formData} />
                }
                {workType === WorkType.designLegacy &&
                    <ReviewTableLegacy formData={props.formData} enableEdit={false} />
                }
            </div>
            <WorkDetailDetailsSidebar />
        </div>
    )
}

export default WorkDetailDetails
