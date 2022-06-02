import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import coursesJSON from '../../../../../assets/data/courses.json'

import { LearnCourse } from './learn-course.model'
import { LearnLessonMeta } from './learn-lesson-meta.model'
import { LearnLesson } from './learn-lesson.model'
import { LearnModule } from './learn-module.model'

export interface LessonProviderData {
    lesson?: LearnLessonMeta
    loading: boolean
    ready: boolean
}

export interface LessonProviderValue {
    courseData: LessonProviderData
    fetchCourseData: (certification: string) => {
        cancelFetch: () => void
    }
}

export const useLessonProvider: (
    course?: string,
    module?: string,
    lesson?: string,
) => LessonProviderData = (course?: string, module?: string, lesson?: string): LessonProviderData => {
    const [state, setState]: [LessonProviderData, Dispatch<SetStateAction<LessonProviderData>>] = useState<LessonProviderData>({
        loading: false,
        ready: false,
    })

    useEffect(() => {
        if (!course || !module || !lesson) {
            setState((prevState) => ({
                ...prevState,
                lesson: undefined,
                loading: false,
                ready: false,
            }))
            return
        }

        setState((prevState) => ({
            ...prevState,
            loading: true,
        }))

        const t: ReturnType<typeof setTimeout> = setTimeout(() => {
            const courseData: LearnCourse|undefined = coursesJSON.courses.find(c => c.certification === course)
            const moduleData: LearnModule|undefined = courseData?.modules.find(m => m.meta.dashedName === module)
            const lessonData: LearnLesson|undefined = moduleData?.lessons.find(l => l.dashedName === lesson)

            const lessonUrl: string = [
                'learn',
                courseData?.key ?? course,
                module,
                lesson,
            ].filter(Boolean).join('/')

            setState((prevState) => ({
                ...prevState,
                lesson: lessonData && {
                    ...lessonData,
                    course: {
                        certification: courseData?.certification ?? '',
                        title: courseData?.title ?? '',
                    },
                    lessonUrl,
                    module: {
                        dashedName: moduleData?.meta.dashedName ?? '',
                        title: moduleData?.meta.name ?? '',
                    },
                },
                loading: false,
                ready: true,
            }))
        }, 350)

        return () => clearTimeout(t)
    }, [course, module, lesson])

    return state
}
