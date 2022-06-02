import { FC } from 'react'

import styles from './Completed.module.scss'
import { Button, LearnCertification, textFormatDateLocaleShortString } from '../../../../../lib'
import { CourseTitle } from '../../../components'

interface CompletedProps {
    course: LearnCertification
    completed: Date|number
}

const Completed: FC<CompletedProps> = (props: CompletedProps) => {

    return (
        <div className={styles['wrap']}>
            <div className={styles['line']}>
                <CourseTitle
                    title={props.course.title}
                    type={props.course.category}
                    credits={props.course.providerName}
                />
                <div className={styles['completed-status']}>
                    Completed{' '}
                    {textFormatDateLocaleShortString(new Date(props.completed))}
                </div>
            </div>
            <div className={styles['buttons-wrap']}>
                <Button size='xs' buttonStyle='secondary' label='View Details' />
                <Button size='xs' buttonStyle='secondary' label='Get your certificate' />
            </div>
        </div>
    )
}

export default Completed