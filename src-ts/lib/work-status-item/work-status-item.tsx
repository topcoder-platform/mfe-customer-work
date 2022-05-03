import { Work, WorkStatus } from '../work-provider'

import styles from './WorkStatusItem.module.scss'

export interface WorkStatusItemProps {
    work: Work
}

function WorkStatusItem({work}: WorkStatusItemProps): JSX.Element {

    const statusKey: (keyof typeof WorkStatus) | undefined = Object.entries(WorkStatus)
        .find(([key, value]) => value === work.status)
        ?.[0] as keyof typeof WorkStatus

    return (
        <div className={styles['status-container']}>
            <div className={styles[statusKey]}></div>
            <div className='small-tab'>{work.status}</div>
        </div>
    )
}

export default WorkStatusItem
