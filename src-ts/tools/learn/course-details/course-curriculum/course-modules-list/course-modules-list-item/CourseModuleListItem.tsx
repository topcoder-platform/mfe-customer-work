import classNames from 'classnames'
import { FC } from 'react'

import { IconOutline, LearnModule } from '../../../../../../lib'
import { StatusCheckbox } from '../../../../components'

import styles from './CourseModuleListItem.module.scss'

interface CourseModuleListItemProps {
    completed?: boolean
    duration: LearnModule['meta']['estimatedCompletionTime']
    lessonsCount: number
    name: string
    progress?: number
    shortDescription: Array<string>
}

const CourseModuleListItem: FC<CourseModuleListItemProps> = (props: CourseModuleListItemProps) => {

    return (
        <div className={styles['wrap']}>
            <StatusCheckbox completed={props.completed} partial={!props.completed && !!props.progress} />
            <div className={styles['content']}>
                <div className='body-main-bold'>
                    {props.name}
                </div>
                {!props.completed && (
                    <div className='body-main'>
                        <span dangerouslySetInnerHTML={{ __html: props.shortDescription.join('<br/>') }}></span>
                    </div>
                )}
                <div className={styles['summary']}>
                    <span className={styles['summary-item']}>
                        <IconOutline.DocumentTextIcon />
                        {props.lessonsCount} Lessons
                    </span>
                    <span className={styles['summary-item']}>
                        <IconOutline.ClockIcon />
                        {props.duration.value} {props.duration.units}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CourseModuleListItem
