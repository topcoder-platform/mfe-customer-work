import { IconOutline, Work, WorkStatus } from '../../../../lib'

import styles from './WorkStatusRenderer.module.scss'

function WorkStatusRenderer(work: Work): JSX.Element {

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

export default WorkStatusRenderer
