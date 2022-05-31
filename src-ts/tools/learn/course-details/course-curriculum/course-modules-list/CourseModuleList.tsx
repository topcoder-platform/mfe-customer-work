import { FC } from 'react'

import { LearnModule } from '../../../../../lib'

import { CourseModuleListItem } from './course-modules-list-item'
import styles from './CourseModuleList.module.scss'

interface CourseModuleListProps {
    completed?: boolean
    getProgress: (m: LearnModule) => number
    modules: Array<LearnModule>
}

const CourseModuleList: FC<CourseModuleListProps> = (props: CourseModuleListProps) => {

    return (
        <div className={styles['wrap']}>
            {props.modules.map((module) => (
                <CourseModuleListItem
                    name={module.meta.name}
                    shortDescription={module.meta.introCopy}
                    lessonsCount={module.meta.lessonCount}
                    duration={module.meta.estimatedCompletionTime}
                    completed={props.completed}
                    progress={props.getProgress(module)}
                    key={module.key}
                />
            ))}
        </div>
    )
}

export default CourseModuleList
