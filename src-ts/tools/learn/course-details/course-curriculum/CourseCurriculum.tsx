import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { Button, LearningHat } from '../../../../lib'
import { LearnCourse, LearnLesson, LearnModule, LearnMyCertificationProgress } from '../../services'
import { TcAcademyPolicyModal } from '../../components'

import { CourseModuleList } from './course-modules-list'
import styles from './CourseCurriculum.module.scss'
import { CurriculumSummary } from './curriculum-summary'

interface CourseCurriculumProps {
    course: LearnCourse
    progress?: LearnMyCertificationProgress
}

const CourseCurriculum: FC<CourseCurriculumProps> = (props: CourseCurriculumProps) => {
    const navigate: NavigateFunction = useNavigate()

    const [isTcAcademyPolicyModal, setIsTcAcademyPolicyModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    const handleStartCourse: () => void = useCallback(() => {
        const current: Array<string> = (props.progress?.currentLesson ?? '').split('/')
        const course: LearnCourse = props.course
        const module: LearnModule = course.modules[0]
        const lesson: LearnLesson = module.lessons[0]

        const coursePath: string = [
            course && `course=${encodeURIComponent(course.certification)}`,
            module && `module=${encodeURIComponent(current[0] ?? module.meta.dashedName)}`,
            lesson && `lesson=${encodeURIComponent(current[1] ?? lesson.dashedName)}`,
        ].filter(Boolean).join('&')
        navigate(`/learn/fcc?${coursePath}`)
    }, [props.course, props.progress])

    const status: string = props.progress?.status ?? 'init'
    const progress: number = props.progress?.completed ?? 0
    const inProgress: boolean = status === 'in-progress'
    const isCompleted: boolean = status === 'completed'

    return (
        <>
            <div className={styles['wrap']}>
                <div className={styles['title']}>
                    {isCompleted && (
                        <>
                            <LearningHat />
                            <h2 className='details'>Congratulations!</h2>
                        </>
                    )}
                    {!isCompleted && (<h4 className='details'>Course Curriculum</h4>)}
                </div>

                <CurriculumSummary
                    course={props.course}
                    onClickMainBtn={() => setIsTcAcademyPolicyModal(true)}
                    progress={inProgress ? progress : 0}
                    completed={isCompleted}
                />

                <CourseModuleList
                    modules={props.course.modules}
                    progress={props.progress}
                />
            </div>
            {isCompleted && (
                <div className={styles['bottom-link']}>
                    <Button
                        buttonStyle='link'
                        label='See all my learning'
                    />
                </div>
            )}

            <TcAcademyPolicyModal
                isOpen={isTcAcademyPolicyModal}
                onClose={() => setIsTcAcademyPolicyModal(false)}
                onConfirm={handleStartCourse}
            />
        </>
    )
}

export default CourseCurriculum
