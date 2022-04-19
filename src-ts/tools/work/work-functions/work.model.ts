import { WorkStatus } from './work-status.enum'
import { WorkType } from './work-type.enum'

export interface Work {
    cost: number
    created: Date
    description?: string
    id: string
    messageCount?: number
    solutionsReady?: Date
    status: WorkStatus
    title: string
    type: WorkType
}
