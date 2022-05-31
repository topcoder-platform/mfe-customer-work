import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { Button, LearnCourse, LearningHat, LearnLesson, LearnModule } from '../../../../lib'
import { TcAcademyPolicyModal } from '../../components'

import { CourseModuleList } from './course-modules-list'
import styles from './CourseCurriculum.module.scss'
import { CurriculumSummary } from './curriculum-summary'

interface CourseCurriculumProps {
    course: LearnCourse
}

const CourseCurriculum: FC<CourseCurriculumProps> = (props: CourseCurriculumProps) => {
    const navigate: NavigateFunction = useNavigate()

    const [isTcAcademyPolicyModal, setIsTcAcademyPolicyModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    const handleStartCourse: () => void = useCallback(() => {
        const course: LearnCourse = props.course
        const module: LearnModule = course.modules[0]
        const lesson: LearnLesson = module.lessons[0]

        const coursePath: string = [
            course && `course=${encodeURIComponent(course.certification)}`,
            module && `module=${encodeURIComponent(module.meta.dashedName)}`,
            lesson && `lesson=${encodeURIComponent(lesson.dashedName)}`,
        ].filter(Boolean).join('&')
        navigate(`/learn/fcc?${coursePath}`)
    }, [props.course])

    const progress = Math.random()
    const inProgress = progress > 0.35;
    const completed = progress > 0.65;

    const getProgress = (module: LearnModule) => (
        completed ? 1 : (!inProgress) ? 0 : Math.random()
    )

    return (
        <>
            <div className={styles['wrap']}>
                <div className={styles['title']}>
                    {completed && (
                        <>
                            <LearningHat />
                            <h2 className="details">Congratulations!</h2>
                        </>
                    )}
                    {!completed && (<h4 className='details'>Course Curriculum</h4>)}
                </div>

                <CurriculumSummary
                    course={props.course}
                    onClickMainBtn={() => setIsTcAcademyPolicyModal(true)}
                    progress={inProgress ? progress : 0}
                    completed={completed}
                />

                <CourseModuleList
                    modules={props.course.modules}
                    completed={completed}
                    getProgress={getProgress}
                />
            </div>
            {completed && (
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
