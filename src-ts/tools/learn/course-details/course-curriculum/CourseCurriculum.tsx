import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TcAcademyPolicyModal } from '../../tc-academy-policy-modal'

import { CourseModuleList } from './course-modules-list'
import styles from './CourseCurriculum.module.scss'
import { CurriculumSummary } from './curriculum-summary'

interface CourseCurriculumProps {
}

const CourseCurriculum: FC<CourseCurriculumProps> = (props: CourseCurriculumProps) => {
    const navigate: any = useNavigate()

    const [isTcAcademyPolicyModal, setIsTcAcademyPolicyModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    const handleStartCourse: () => void = useCallback(() => {
        navigate('/learn/fcc')
    }, [])

    return (
        <>
            <div className={styles['wrap']}>
                <h4 className='details'>Course Curriculum</h4>

                <CurriculumSummary onStartCourse={() => setIsTcAcademyPolicyModal(true)} />

                <CourseModuleList />
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
