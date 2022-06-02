import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import certificationsJSON from '../../../../../assets/data/certifications.json'

import { LearnCertification } from './learn-certification.model'

export interface CertificationsProviderData {
    certifications: Array<LearnCertification>
    certificationsCount: number
    loading: boolean
    ready: boolean
}

export const useCertificationsProvider: () => CertificationsProviderData = (): CertificationsProviderData => {
    const [state, setState]: [CertificationsProviderData, Dispatch<SetStateAction<CertificationsProviderData>>] = useState<CertificationsProviderData>({
        certifications: [],
        certificationsCount: 0,
        loading: false,
        ready: false,
    })

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            loading: true,
        }))

        const t: ReturnType<typeof setTimeout> = setTimeout(() => {
            setState((prevState) => ({
                ...prevState,
                certifications: [...certificationsJSON.certifications],
                certificationsCount: certificationsJSON.certificationsCount,
                loading: false,
                ready: true,
            }))
        }, 350)

        return () => clearTimeout(t)
    }, [])

    return state
}
