import { FC, useCallback } from 'react'
import { LearnCourse, LearnLesson, LearnModule, LoadingSpinner } from '../../../../lib'

import { CollapsibleItem } from './collapsible-item'
import styles from './CourseOutline.module.scss'

interface CourseOutlineProps {
    ready?: boolean
    course?: LearnCourse
    currentStep?: string;
}

const CourseOutline: FC<CourseOutlineProps> = (props: CourseOutlineProps) => {
 
    
    const lessonPath: (module: LearnModule, lesson: LearnLesson) => string = useCallback((module: LearnModule, lesson: LearnLesson) => {
        const course: LearnCourse = props.course!

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
                                title={module.meta.name}
                                items={module.lessons}
                                active={props.currentStep}
                                id={(it: any) => `${module.meta.dashedName}/${it.dashedName}`}
                                path={(it: any) => lessonPath(module, it)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default CourseOutline
