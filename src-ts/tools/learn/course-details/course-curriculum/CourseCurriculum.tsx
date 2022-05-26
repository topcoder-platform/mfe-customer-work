import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { LearnCourse, LearnLesson, LearnModule } from '../../../../lib'
import { TcAcademyPolicyModal } from '../../tc-academy-policy-modal'

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

    return (
        <>
            <div className={styles['wrap']}>
                <h4 className='details'>Course Curriculum</h4>

                <CurriculumSummary course={props.course} onStartCourse={() => setIsTcAcademyPolicyModal(true)} />

                <CourseModuleList modules={props.course.modules} />
            </div>

            <TcAcademyPolicyModal
                isOpen={isTcAcademyPolicyModal}
                onClose={() => setIsTcAcademyPolicyModal(false)}
                onConfirm={handleStartCourse}
            />
        </>
    )
}

export default CourseCurriculum
