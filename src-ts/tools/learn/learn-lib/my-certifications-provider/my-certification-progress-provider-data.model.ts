import { LearnMyCertificationProgress } from './my-certifications-functions'

export interface MyCertificationProgressProviderData {
    loading: boolean
    certificateProgress?: LearnMyCertificationProgress
    setCertificateProgress: (progess: LearnMyCertificationProgress) => void,
    ready: boolean
}
