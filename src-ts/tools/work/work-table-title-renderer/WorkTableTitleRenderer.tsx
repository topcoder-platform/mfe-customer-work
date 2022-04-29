import { FC, SVGProps } from 'react'

import {
    IconWorkTypeDataExploration,
    IconWorkTypeUnknown,
    IconWorkTypeWebsiteDesign,
    Work,
    WorkType,
} from '../../../lib'

import styles from './WorkTableTitleRenderer.module.scss'

function WorkTableTitleRenderer(data: Work): JSX.Element {

    let Icon: FC<SVGProps<SVGSVGElement>>
    switch (data.type) {

        case WorkType.design:
            Icon = IconWorkTypeWebsiteDesign
            break

        case WorkType.data:
            Icon = IconWorkTypeDataExploration
            break

        default:
            Icon = IconWorkTypeUnknown
            break
    }

    return (
        <div className={styles['work-table-title-container']}>
            <Icon />
            <div>
                <div className={styles['title']}>{data.title}</div>
                {/* TODO: limit the height/number of chars for the desc */}
                <div className={styles['description']}>{data.description}</div>
            </div>
        </div>
    )
}

export default WorkTableTitleRenderer
