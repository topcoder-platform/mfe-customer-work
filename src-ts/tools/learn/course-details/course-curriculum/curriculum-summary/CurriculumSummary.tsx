import { FC } from 'react'

import { Button, IconOutline } from '../../../../../lib'

import styles from './CurriculumSummary.module.scss'

interface CurriculumSummaryProps {
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
                        5
                    </h3>
                    <div className={styles['count-label']}>
                        Courses
                    </div>
                </div>
            </div>
            <div className={styles['stat-item']}>
                <div className={styles['icon']}>
                    <IconOutline.ClockIcon />
                </div>
                <div className='sub'>
                    <h3 className={styles['count']}>
                        80
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
