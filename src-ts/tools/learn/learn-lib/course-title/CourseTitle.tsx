import classNames from 'classnames'
import { FC, ReactNode } from 'react'

import styles from './CourseTitle.module.scss'
import { ReactComponent as LearnChallengeBadgeIcon } from './learn-challenge-badge-icon.svg'

interface CourseTitleProps {
    children?: ReactNode
    credits?: string
    size?: 'md'|'lg'|'xl'
    title: string
    type: string
}

const CourseTitle: FC<CourseTitleProps> = (props: CourseTitleProps) => {

    const title: ReactNode = props.size === 'md' ? (
        <div className='body-main-bold'>
            {props.title}
        </div>
    ) : (
        <h1 className={classNames(props.size === 'lg' ? 'details' : '', props.size)}>
            {props.title}
        </h1>
    )

    return (
        <div className={styles['wrap']}>
            <div className={classNames(styles['badge-icon'], props.size)}>
                <LearnChallengeBadgeIcon />
            </div>
            <div className={styles['text']}>
                <div className={styles['title-row']}>
                    {title}
                    {props.children}
                </div>
                {props.credits && (
                    <em className={classNames('quote-small', props.size)}>
                        by {props.credits}
                    </em>
                )}
            </div>
        </div>
    )
}

export default CourseTitle