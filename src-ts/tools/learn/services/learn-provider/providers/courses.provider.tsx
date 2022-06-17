import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { getCourseAsync, LearnCourse } from '../../learn-functions'

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

        getCourseAsync(certification).then((course) => {
            setState((prevState) => ({
                ...prevState,
                course,
                loading: false,
                ready: true,
            }))
        })
    }, [certification])

    return state
}
