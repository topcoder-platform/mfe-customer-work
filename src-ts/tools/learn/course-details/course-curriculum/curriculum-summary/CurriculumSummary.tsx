import { FC } from 'react'

import { Button, IconOutline, ProgressBar, textFormatDateLocaleShortString } from '../../../../../lib'
import { LearnCourse } from '../../../services'

import styles from './CurriculumSummary.module.scss'

interface CurriculumSummaryProps {
    completed?: boolean
    course: LearnCourse
    onClickCertificateBtn?: () => void
    onClickMainBtn: () => void
    progress?: number
}

const CurriculumSummary: FC<CurriculumSummaryProps> = (props: CurriculumSummaryProps) => {
    const progress: number|undefined = props.progress
    const inProgress: boolean = !!progress
    const completed: boolean|undefined = props.completed

    return (
        <div className={styles['wrap']}>
            {inProgress && (
                <>
                    <div className={styles['title']}>
                        {completed ? (
                            <>
                                <span>
                                    Completed{' '}
                                    {textFormatDateLocaleShortString(new Date('2022-06-24'))}
                                </span>
                                <Button
                                    buttonStyle='secondary'
                                    size='xs'
                                    label='Get your certificate'
                                    onClick={props.onClickCertificateBtn}
                                />
                            </>
                        ) : ('In Progress')}
                    </div>
                    <ProgressBar progress={completed ? 1 : (progress ?? 0)} />
                </>
            )}

            <div className={styles['summary']}>
                <div className={styles['stat-item']}>
                    <div className={styles['icon']}>
                        <IconOutline.DocumentTextIcon />
                    </div>
                    <div className='sub'>
                        <h3 className={styles['count']}>
                            {props.course.moduleCount}
                        </h3>
                        <div className={styles['count-label']}>
                            Modules
                        </div>
                    </div>
                </div>
                <div className={styles['stat-item']}>
                    <div className={styles['icon']}>
                        <IconOutline.ClockIcon />
                    </div>
                    <div className='sub'>
                        <h3 className={styles['count']}>
                            {props.course.completionHours}
                        </h3>
                        <div className={styles['count-label']}>
                            Hours
                        </div>
                    </div>
                </div>

                <div className={styles['button']}>
                    <Button
                        buttonStyle={completed ? 'secondary' : 'primary'}
                        size='md'
                        label={completed ? 'Review' : (inProgress ? 'Resume' : 'Start Course')}
                        onClick={props.onClickMainBtn}
                    />
                </div>
            </div>
        </div>
    )
}

export default CurriculumSummary
