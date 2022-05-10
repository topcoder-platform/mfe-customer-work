import { FC, SVGProps } from 'react'

import {
    Work,
    WorkType,
    WorkTypeDataExplorationIcon,
    WorkTypeUnknownIcon,
    WorkTypeWebsiteDesignIcon,
} from '../../../../lib'

import styles from './WorkTableTitleRenderer.module.scss'

function WorkTableTitleRenderer(data: Work): JSX.Element {

    let Icon: FC<SVGProps<SVGSVGElement>>
    switch (data.type) {

        case WorkType.design:
            Icon = WorkTypeWebsiteDesignIcon
            break

        case WorkType.data:
            Icon = WorkTypeDataExplorationIcon
            break

        default:
            Icon = WorkTypeUnknownIcon
            break
    }

    return (
        <div className={styles['work-table-title-container']}>
            <Icon />
            <div className={styles['work-table-title']}>
                <div className={styles.title}>
                    {data.title}
                </div>
                <div className={styles.description}>
                    {data.description}
                </div>
            </div>
        </div>
    )
}

export default WorkTableTitleRenderer
