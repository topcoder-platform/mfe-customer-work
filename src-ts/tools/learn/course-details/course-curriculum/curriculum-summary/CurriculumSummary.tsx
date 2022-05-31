import { FC } from 'react'

import { Button, IconOutline, LearnCourse, ProgressBar, textFormatDateLocaleShortString } from '../../../../../lib'

import styles from './CurriculumSummary.module.scss'

interface CurriculumSummaryProps {
    course: LearnCourse
    completed?: boolean
    onClickMainBtn: () => void
    onClickCertificateBtn?: () => void
    progress?: number
}

const CurriculumSummary: FC<CurriculumSummaryProps> = (props: CurriculumSummaryProps) => {
    const progress = props.progress
    const inProgress = !!progress;
    const completed = props.completed;

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
                        ): ('In Progress')}
                    </div>
                    <ProgressBar progress={completed ? 1 : progress} />
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
