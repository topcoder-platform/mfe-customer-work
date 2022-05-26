export interface LearnLessonMeta {
    course: {
        certification: string
        title: string
    }
    dashedName: string
    lessonUrl: string
    module: {
        dashbedName: string
        title: string
    }
    title: string
}

export interface LearnLesson {
    dashedName: string
    title: string
}
