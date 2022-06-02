import { FC } from 'react'

import { Button, LearnCertification, LearnMyCertificationProgress, ProgressBar } from '../../../../../lib'
import { CourseTitle } from '../../../components'

import styles from './InProgress.module.scss'

interface InProgressProps {
    course: LearnCertification
    onClick: (c: string, p: LearnMyCertificationProgress) => void
    progress: LearnMyCertificationProgress
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
                <Button
                    size='md'
                    buttonStyle='primary'
                    label='resume'
                    onClick={() => props.onClick(props.course.certification, props.progress)}
                />
            </div>

            <ProgressBar progress={props.progress.completed} />
        </div>
    )
}

export default InProgress
