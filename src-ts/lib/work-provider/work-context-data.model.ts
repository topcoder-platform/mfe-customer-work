import { Work } from './work-functions'

export interface WorkContextData {
    deleteWorkAsync: (id: string) => Promise<void>
    initialized: boolean
    work: Array<Work>
}
