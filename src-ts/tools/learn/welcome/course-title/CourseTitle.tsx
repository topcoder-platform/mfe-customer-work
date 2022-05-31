import { FC } from 'react'

import { LearnChallengeBadgeIcon } from '../../../../lib'
import styles from './CourseTitle.module.scss'

interface CourseTitleProps {
    credits?: string
    title: string
    type: string
}

const CourseTitle: FC<CourseTitleProps> = (props: CourseTitleProps) => {

    return (
        <div className={styles['wrap']}>
            <div className={styles['badge-icon']}>
                <LearnChallengeBadgeIcon />
            </div>
            <div className={styles['text']}>
                <div className='body-main-bold'>
                    {props.title}
                </div>
                {props.credits && (
                    <em className='quote-small'>
                        by {props.credits}
                    </em>
                )}
            </div>
        </div>
    )
}

export default CourseTitle
