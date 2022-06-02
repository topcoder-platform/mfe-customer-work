import { LearnLesson } from './learn-lesson.model'

export interface LearnModuleMeta {
    dashedName: string
    estimatedCompletionTime: {
        units: string
        value: number
    }
    introCopy: Array<string>
    lessonCount: number
    name: string
}

export interface LearnModule {
    key: string
    lessons: Array<LearnLesson>
    meta: LearnModuleMeta
}
