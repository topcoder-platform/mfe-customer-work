import { WorkStatus } from './work-status.enum'
import { WorkTypeCategory } from './work-type-category.enum'
import { WorkType } from './work-type.enum'

export interface Work {
    cost?: number
    created: Date
    description?: string
    id: string
    messageCount?: number
    solutionsReady?: Date
    status: WorkStatus
    title: string
    type: WorkType
    typeCategory: WorkTypeCategory
}
