import { FC } from 'react'

import { IconOutline } from '../../../../../../lib'

import styles from './CourseModuleListItem.module.scss'

interface CourseModuleListItemProps {
    completed?: boolean
    duration: number
    lessonsCount: number
    name: string
    shortDescription: string
}

const CourseModuleListItem: FC<CourseModuleListItemProps> = (props: CourseModuleListItemProps) => {

    return (
        <div className={styles['wrap']}>
            <div className={styles['checkmark']}></div>
            <div className={styles['content']}>
                <div className='body-main-bold'>
                    {props.name}
                </div>
                <div className='body-main'>
                    {props.shortDescription}
                </div>
                <div className={styles['summary']}>
                    <span className={styles['summary-item']}>
                        <IconOutline.DocumentTextIcon />
                        {props.lessonsCount} Lessons
                    </span>
                    <span className={styles['summary-item']}>
                        <IconOutline.ClockIcon />
                        {props.duration} hours
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CourseModuleListItem
