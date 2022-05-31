import { FC } from 'react'
import { Button, LearnCertification, ProgressBar } from '../../../../../lib'
import { CourseTitle } from '../../course-title'

import styles from './InProgress.module.scss'

interface InProgressProps {
    course: LearnCertification
    progress: number
}

const InProgress: FC<InProgressProps> = (props: InProgressProps) => {

    return (
        <div className={styles['wrap']}>
            <div className={styles['line']}>
                <CourseTitle
                    title={props.course.title}
                    type={props.course.category}
                    credits={props.course.providerName}
                />
                <Button size="md" buttonStyle='primary' label='resume' />
            </div>

            <ProgressBar progress={props.progress} />
        </div>
    )
}

export default InProgress
