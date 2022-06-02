import { LearnModule } from './learn-module.model'

export interface LearnCourse {
    certification: string
    completionHours: number
    introCopy: Array<string>
    key: string
    moduleCount: number
    modules: Array<LearnModule>
    note: string
    provider: string
    title: string
}
