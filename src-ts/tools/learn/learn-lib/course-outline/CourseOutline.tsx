import { FC, useCallback } from 'react'

import { LoadingSpinner, } from '../../../../lib'
import {
    LearnCourse,
    LearnLesson,
    LearnModule,
    MyCertificationProgressProviderData,
    useMyCertificationProgress,
} from '../../services'

import { CollapsibleItem } from './collapsible-item'
import styles from './CourseOutline.module.scss'

interface CourseOutlineProps {
    course?: LearnCourse
    currentStep?: string
    ready?: boolean
}

const CourseOutline: FC<CourseOutlineProps> = (props: CourseOutlineProps) => {
    const { progress }: MyCertificationProgressProviderData = useMyCertificationProgress(props.course?.certification)

    const lessonPath: (course: LearnCourse, module: LearnModule, lesson: LearnLesson) => string = useCallback((course: LearnCourse, module: LearnModule, lesson: LearnLesson) => {
        const path: string = [
            course && `course=${encodeURIComponent(course.certification)}`,
            module && `module=${encodeURIComponent(module.meta.dashedName)}`,
            lesson && `lesson=${encodeURIComponent(lesson.dashedName)}`,
        ].filter(Boolean).join('&')

        return `/learn/fcc?${path}`
    }, [props.course])

    return (
        <div className={styles['wrap']}>
            {props.ready === false && <LoadingSpinner />}

            {props.course && (
                <div className={styles['content']}>
                    {props.course.modules.map((module) => (
                        <CollapsibleItem
                            active={props.currentStep}
                            duration={module.meta.estimatedCompletionTime}
                            id={module.key}
                            itemId={(it: any) => `${module.meta.dashedName}/${it.dashedName}`}
                            items={module.lessons}
                            key={module.key}
                            lessonsCount={module.meta.lessonCount}
                            path={(it: any) => lessonPath(props.course, module, it)}
                            progress={progress?.modules}
                            shortDescription={module.meta.introCopy}
                            title={module.meta.name}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CourseOutline
