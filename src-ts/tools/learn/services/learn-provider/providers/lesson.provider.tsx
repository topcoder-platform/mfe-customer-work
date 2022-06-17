import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
    getCourseAsync,
    LearnLesson,
    LearnLessonMeta,
    LearnModule
} from '../../learn-functions'

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

        getCourseAsync(course).then((courseData) => {
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
        })
    }, [course, module, lesson])

    return state
}
