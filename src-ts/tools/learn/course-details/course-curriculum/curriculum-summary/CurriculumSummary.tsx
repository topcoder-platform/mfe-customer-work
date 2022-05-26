import { FC } from 'react'

import { Button, IconOutline, LearnCourse } from '../../../../../lib'

import styles from './CurriculumSummary.module.scss'

interface CurriculumSummaryProps {
    course: LearnCourse
    onStartCourse: () => void
}

const CurriculumSummary: FC<CurriculumSummaryProps> = (props: CurriculumSummaryProps) => {

    return (
        <div className={styles['wrap']}>
            <div className={styles['stat-item']}>
                <div className={styles['icon']}>
                    <IconOutline.DocumentTextIcon />
                </div>
                <div className='sub'>
                    <h3 className={styles['count']}>
                        {props.course.moduleCount}
                    </h3>
                    <div className={styles['count-label']}>
                        Modules
                    </div>
                </div>
            </div>
            <div className={styles['stat-item']}>
                <div className={styles['icon']}>
                    <IconOutline.ClockIcon />
                </div>
                <div className='sub'>
                    <h3 className={styles['count']}>
                        {props.course.completionHours}
                    </h3>
                    <div className={styles['count-label']}>
                        Hours
                    </div>
                </div>
            </div>

            <div className={styles['button']}>
                <Button
                    buttonStyle='primary'
                    size='md'
                    label='Start Course'
                    onClick={props.onStartCourse}
                />
            </div>
        </div>
    )
}

export default CurriculumSummary
