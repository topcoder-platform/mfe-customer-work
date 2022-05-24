import classNames from 'classnames'
import { FC } from 'react'

import { Button, LearnChallengeBadgeIcon } from '../../../../lib'

import styles from './CoursesCard.module.scss'

interface CoursesCardProps {
    credits?: string
    link?: string
    title: string
    type: 'webdev'
}

enum COURSES_TYPES_MAP {
    webdev = 'Web Development',
}

const CoursesCard: FC<CoursesCardProps> = (props: CoursesCardProps) => {

    return (
        <div className={classNames(styles['wrap'], !props.link && 'soon')}>
            <div className='overline'>
                {COURSES_TYPES_MAP[props.type]}
            </div>
            <div className={styles['content']}>
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
            <div className={styles['bottom']}>
                {props.link && (
                    <Button
                        buttonStyle='primary'
                        size='sm'
                        label='Get Started'
                        route={props.link}
                    />
                )}
                {!props.link && (
                    <h4 className='details'>Coming Soon</h4>
                )}
            </div>
        </div>
    )
}

export default CoursesCard
