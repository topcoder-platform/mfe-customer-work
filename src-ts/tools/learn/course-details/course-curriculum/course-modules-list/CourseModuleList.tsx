import { FC } from 'react'

import { LearnModule, LearnMyCertificationProgress, LearnMyModuleProgress } from '../../../services'

import { CourseModuleListItem } from './course-modules-list-item'
import styles from './CourseModuleList.module.scss'

interface CourseModuleListProps {
    modules: Array<LearnModule>
    progress?: LearnMyCertificationProgress
}

const CourseModuleList: FC<CourseModuleListProps> = (props: CourseModuleListProps) => {

    const hasProgress: (m: string) => boolean = (m: string) => {
        if (!props.progress) {
            return false
        }

        const module: LearnMyModuleProgress|undefined = props.progress.modules.find(mod => mod.module === m)
        if (!module) {
            return false
        }

        return module.completedLessons.length > 0
    }

    const isCompleted: (m: string) => boolean = (m: string) => {
        if (!props.progress) {
            return false
        }

        const module: LearnMyModuleProgress|undefined = props.progress.modules.find(mod => mod.module === m)
        if (!module) {
            return false
        }

        return module.lessonCount === module.completedLessons.length
    }

    return (
        <div className={styles['wrap']}>
            {props.modules.map((module) => (
                <CourseModuleListItem
                    name={module.meta.name}
                    shortDescription={module.meta.introCopy}
                    lessonsCount={module.meta.lessonCount}
                    duration={module.meta.estimatedCompletionTime}
                    completed={isCompleted(module.key)}
                    hasProgress={hasProgress(module.key)}
                    key={module.key}
                />
            ))}
        </div>
    )
}

export default CourseModuleList
