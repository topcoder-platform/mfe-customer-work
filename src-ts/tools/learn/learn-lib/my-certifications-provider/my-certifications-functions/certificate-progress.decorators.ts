import { LearnMyCertificationProgress } from "./learn-my-certification-progress.model";

export function decorateCompletedPercentage(myCertifications: Array<LearnMyCertificationProgress>): Array<LearnMyCertificationProgress> {
    return myCertifications.map((certif) => {
        const progress: {lessonCount: number, completedLessons: number} = certif.modules.reduce((prev, m) => ({
            lessonCount: prev.lessonCount + m.lessonCount,
            completedLessons: prev.completedLessons + m.completedLessons.length,
        }), {lessonCount: 0, completedLessons: 0});

        return {
            ...certif,
            completed: progress.completedLessons / progress.lessonCount,
        }
    })
}