import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import coursesJSON from '../../../assets/data/courses.json'
import { LearnCourse } from '../models'

export interface CoursesProviderData {
    course?: LearnCourse
    loading: boolean
    ready: boolean
}

export interface CoursesProviderValue {
    courseData: CoursesProviderData
    fetchCourseData: (certification: string) => {
        cancelFetch: () => void
    }
}

export const useCoursesProvider: (certification?: string) => CoursesProviderData = (certification?: string): CoursesProviderData => {
    const [state, setState]: [CoursesProviderData, Dispatch<SetStateAction<CoursesProviderData>>] = useState<CoursesProviderData>({
        loading: false,
        ready: false,
    })

    useEffect(() => {
        if (!certification) {
            setState((prevState) => ({
                ...prevState,
                course: undefined,
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
            setState((prevState) => ({
                ...prevState,
                course: coursesJSON.courses.find((c) => c.certification === certification),
                loading: false,
                ready: true,
            }))
        }, 350)

        return () => clearTimeout(t)
    }, [certification])

    return state
}
