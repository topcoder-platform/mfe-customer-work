import classNames from 'classnames'
import { FC } from 'react'

import { LearnChallengeBadgeIcon } from '../../../../lib'

import styles from './CourseTitle.module.scss'

interface CourseTitleProps {
    credits?: string
    title: string
    type: string
    size?: 'md'|'lg'
}

const CourseTitle: FC<CourseTitleProps> = (props: CourseTitleProps) => {

    const title = props.size === 'lg' ? (
        <h1 className='details'>
            {props.title}
        </h1>
    ) : (
        <div className='body-main-bold'>
            {props.title}
        </div>
    )

    return (
        <div className={styles['wrap']}>
            <div className={classNames(styles['badge-icon'], props.size)}>
                <LearnChallengeBadgeIcon />
            </div>
            <div className={styles['text']}>
                {title}
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
