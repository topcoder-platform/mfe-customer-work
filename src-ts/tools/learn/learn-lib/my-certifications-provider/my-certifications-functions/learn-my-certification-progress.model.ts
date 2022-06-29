import { LearnMyModuleProgress } from './learn-my-module-progress.model'

export interface LearnMyCertificationProgress {
    certification: string
    certificationId: string
    completed: number
    completedDate?: string
    courseId: string
    courseKey: string
    currentLesson?: string
    id: string
    modules: Array<LearnMyModuleProgress>
    provider: string
    startDate: string
    status: 'in-progress'|'completed'
}
