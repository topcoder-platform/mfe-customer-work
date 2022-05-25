import { FC } from 'react'

import { LearningHat } from '../../../../lib'

import styles from './ProgressCard.module.scss'

interface ProgressCardProps {
}

const ProgressCard: FC<ProgressCardProps> = (props: ProgressCardProps) => {

    return (
        <div className={styles['wrap']}>
            <div className={styles['icon']}>
                <LearningHat />
            </div>
            <div className={styles['content']}>
                <h2 className='details'>Happy you’re here!</h2>
                <div className={styles['content-text']}>
                    To start learning something new, select a course from the list below. Good Luck!
                </div>
            </div>
        </div>
    )
}

export default ProgressCard
