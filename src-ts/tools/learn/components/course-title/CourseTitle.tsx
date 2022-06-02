import classNames from 'classnames'
import { FC, ReactNode } from 'react'

import { LearnChallengeBadgeIcon } from '../svgs'

import styles from './CourseTitle.module.scss'

interface CourseTitleProps {
    credits?: string
    size?: 'md'|'lg'
    title: string
    type: string
}

const CourseTitle: FC<CourseTitleProps> = (props: CourseTitleProps) => {

    const title: ReactNode = props.size === 'lg' ? (
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
