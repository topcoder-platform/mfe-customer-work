export interface LearnMyModuleProgress {
    completedLessons: Array<{
        completedDate?: string
        dashedName: string
        title: string
    }>
    lessonCount: number
    module: string
}
