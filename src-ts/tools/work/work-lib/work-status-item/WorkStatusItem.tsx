import { WorkStatus } from '../work-provider'

import styles from './WorkStatusItem.module.scss'

export interface WorkStatusItemProps {
    workStatus?: WorkStatus
}

function WorkStatusItem({ workStatus }: WorkStatusItemProps): JSX.Element {

    if (!workStatus) {
        return <></>
    }

    const statusKey: (keyof typeof WorkStatus) | undefined = Object.entries(WorkStatus)
        .find(([key, value]) => value === workStatus)
        ?.[0] as keyof typeof WorkStatus

    return (
        <div className={styles['status-container']}>
            <div className={styles[statusKey]}></div>
            <div className={styles['small-tab']}>
                {workStatus}
            </div>
        </div>
    )
}

export default WorkStatusItem
