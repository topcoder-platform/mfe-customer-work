import { FC, SVGProps } from 'react'

// TODO: export these from the svg barrel file
import { ReactComponent as IconWorkTypeDataExploration } from '../../../lib/svgs/work-type-data-exploration.svg'
import { ReactComponent as IconWorkTypeUnknown } from '../../../lib/svgs/work-type-unknown.svg'
import { ReactComponent as IconWorkTypeWebsiteDesign } from '../../../lib/svgs/work-type-website-design.svg'
import { Work, WorkType } from '../work-functions'

import styles from './WorkListTitleRenderer.module.scss'

function WorkListTitleRenderer(data: Work): JSX.Element {

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
        <div className={styles['work-list-title-container']}>
            <Icon />
            <div>
                <div>{data.title}</div>
                {/* TODO: limit the height/number of chars for the desc */}
                <div>{data.description}</div>
            </div>
        </div>
    )
}

export default WorkListTitleRenderer
