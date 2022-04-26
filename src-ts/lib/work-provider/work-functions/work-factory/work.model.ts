import { WorkProgress } from './work-progress.model'
import { WorkStatus } from './work-status.enum'
import { WorkType } from './work-type.enum'

export interface Work {
    cost?: number
    created: Date
    description?: string
    id: string
    messageCount?: number
    progress: WorkProgress
    solutionsReadyDate?: Date
    status: WorkStatus
    title: string
    type: WorkType
}
