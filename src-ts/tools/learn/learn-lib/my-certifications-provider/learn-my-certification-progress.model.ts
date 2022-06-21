import { LearnMyModuleProgress } from './learn-my-module-progress.model'

export interface LearnMyCertificationProgress {
    completed: number
    startedDate: string
    completedDate?: string
    currentLesson?: string
    modules: Array<LearnMyModuleProgress>
    status: 'in-progress'|'completed'
}
