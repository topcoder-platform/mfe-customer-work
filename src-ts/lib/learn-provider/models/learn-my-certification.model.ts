import { LearnCertification } from './learn-certification.model'

export interface LearnMyModuleProgress {
    completedLessons: Array<{
        completedDate?: string
        dashedName: string
        title: string
    }>
    lessonCount: number
    module: string
}

export interface LearnMyCertificationProgress {
    completed: number
    completedDate?: string
    currentLesson?: string
    modules: Array<LearnMyModuleProgress>
    status: 'in-progress'|'completed'
}

export interface LearnMyCertification extends LearnCertification {
    progress: LearnMyCertificationProgress
}
