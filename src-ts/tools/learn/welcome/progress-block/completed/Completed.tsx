import { FC } from 'react'

import { Button, textFormatDateLocaleShortString } from '../../../../../lib'
import { CourseTitle } from '../../../components'
import { LearnCertification } from '../../../services'

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
                >
                    <div className={styles['completed-status']}>
                        Completed{' '}
                        {textFormatDateLocaleShortString(new Date(props.completed))}
                    </div>
                </CourseTitle>
            </div>
            <div className={styles['buttons-wrap']}>
                <Button size='xs' buttonStyle='secondary' label='View Course' />
                <Button size='xs' buttonStyle='secondary' label='View certificate' />
            </div>
        </div>
    )
}

export default Completed
