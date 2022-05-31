import classNames from 'classnames'
import { FC } from 'react'

import { IconOutline, IconSolid, LearnModule } from '../../../../../../lib'

import styles from './CourseModuleListItem.module.scss'

interface CourseModuleListItemProps {
    completed?: boolean
    duration: LearnModule['meta']['estimatedCompletionTime']
    lessonsCount: number
    name: string
    shortDescription: Array<string>
}

const CourseModuleListItem: FC<CourseModuleListItemProps> = (props: CourseModuleListItemProps) => {

    return (
        <div className={styles['wrap']}>
            <div className={classNames(styles['checkmark'], props.completed && 'completed')}>
                {props.completed && (
                    <IconSolid.CheckCircleIcon />
                )}
            </div>
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
