import { LearnMyModuleProgress } from './learn-my-module-progress.model'

export interface LearnMyCertificationProgress {
    certification: string;
    status: 'in-progress'|'completed'
    startDate: string
    completedDate?: string
    completed: number
    currentLesson?: string
    modules: Array<LearnMyModuleProgress>
}
