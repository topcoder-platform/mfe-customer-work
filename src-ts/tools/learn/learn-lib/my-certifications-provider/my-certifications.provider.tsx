import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getMyCertificationsProgressAsync, LearnMyCertificationProgress } from './my-certifications-functions'

import { MyCertificationsProviderData } from './my-certifications-provider-data.model'

// const myCertifications: Array<LearnMyCertificationProgress> = [...myCertificationsJSON.certifications] as Array<LearnMyCertificationProgress>

export function useMyCertifications(userId?: number): MyCertificationsProviderData {
    const [state, setState]: [MyCertificationsProviderData, Dispatch<SetStateAction<MyCertificationsProviderData>>] = useState<MyCertificationsProviderData>({
        // certifications: [],
        completed: [],
        inProgress: [],
        loading: false,
        ready: false,
    })

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            loading: true,
        }))

        if (!userId) {
            return
        }

        getMyCertificationsProgressAsync(userId).then((myCertifications) => {
            setState((prevState) => ({
                ...prevState,
                completed: myCertifications.filter(c => c.status === 'completed'),
                inProgress: myCertifications.filter(c => c.status === 'in-progress'),
                loading: false,
                ready: true,
            }))
        })
    }, [userId])

    return state
}
