import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import { MyCertificationProgressProviderData } from './my-certification-progress-provider-data.model'
import { getMyCertificationsProgressAsync, LearnMyCertificationProgress } from './my-certifications-functions'
import { decorateCompletedPercentage } from './my-certifications-functions/certificate-progress.decorators'

export function useMyCertificationProgress(userId?: number, certification?: string): MyCertificationProgressProviderData {
    const setCertificateProgress = (progress: LearnMyCertificationProgress) => (
        setState((prevState) => ({...prevState, certificateProgress: progress}))
    )
    
    const [state, setState]: [MyCertificationProgressProviderData, Dispatch<SetStateAction<MyCertificationProgressProviderData>>] = useState<MyCertificationProgressProviderData>({
        loading: false,
        certificateProgress: undefined,
        setCertificateProgress,
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
        
        getMyCertificationsProgressAsync(userId, certification).then(decorateCompletedPercentage).then((myCertifications) => {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                certificateProgress: myCertifications.find(c => c.certification === certification),
                ready: true,
            }))
        })
    }, [userId, certification])

    return state
}
