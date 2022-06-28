import { LearnMyCertificationProgress } from "./my-certifications-functions"

export interface MyCertificationsProviderData {
    // certifications: Array<LearnMyCertificationProgress>
    completed: Array<LearnMyCertificationProgress>
    inProgress: Array<LearnMyCertificationProgress>
    loading: boolean
    ready: boolean
}
