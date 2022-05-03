import { Work } from './work-functions'

export interface WorkContextData {
    deleteWorkAsync: (id: string) => Promise<void>
    error?: string
    hasWork: boolean
    initialized: boolean
    work: Array<Work>
}
