import { LearnMyCertificationProgress } from './learn-my-certification-progress.model'

export function decorateCompletedPercentage(myCertifications: Array<LearnMyCertificationProgress>): Array<LearnMyCertificationProgress> {
    return myCertifications.map((certif) => {
        const progress: {completedLessons: number, lessonCount: number } = certif.modules.reduce((prev, m) => ({
            completedLessons: prev.completedLessons + m.completedLessons.length,
            lessonCount: prev.lessonCount + m.lessonCount,
        }), {lessonCount: 0, completedLessons: 0})

        return {
            ...certif,
            completed: progress.completedLessons / progress.lessonCount,
        }
    })
}
