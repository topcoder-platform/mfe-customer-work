import { FC } from 'react'

import { Button, textFormatDateLocaleShortString } from '../../../../../lib'
import { LearnCertification } from '../../../services'
import { CourseTitle } from '../../../components'

import styles from './Completed.module.scss'

interface CompletedProps {
    completed: string
    course: LearnCertification
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
