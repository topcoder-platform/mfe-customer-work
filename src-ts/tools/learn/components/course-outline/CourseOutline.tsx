import { FC, useCallback } from 'react'

import {
    LearnCourse,
    LearnLesson,
    LearnModule,
    LoadingSpinner,
    MyCertificationProgressProviderData,
    useMyCertificationProgress,
} from '../../../../lib'

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
            {!props.ready && <LoadingSpinner />}

            {props.course && (
                <>
                    <div className={styles['title']}>
                        {props.course.title}
                    </div>
                    <div className={styles['content']}>
                        {props.course.modules.map((module) => (
                            <CollapsibleItem
                                key={module.key}
                                id={module.key}
                                title={module.meta.name}
                                items={module.lessons}
                                active={props.currentStep}
                                itemId={(it: any) => `${module.meta.dashedName}/${it.dashedName}`}
                                path={(it: any) => lessonPath(props.course, module, it)}
                                progress={progress?.modules}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default CourseOutline
