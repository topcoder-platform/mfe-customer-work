import { FC, ReactNode, useCallback } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { Button, LearningHat } from '../../../../lib'
import { LearnMyCertificationProgress, MyCertificationsProviderData, useMyCertifications } from '../../services'

import { Completed } from './completed'
import { InProgress } from './in-progress'
import InitState from './init-state/InitState'
import styles from './ProgressBlock.module.scss'

interface ProgressBlockProps {
}

const ProgressBlock: FC<ProgressBlockProps> = (props: ProgressBlockProps) => {
    const navigate: NavigateFunction = useNavigate()
    const { completed, inProgress }: MyCertificationsProviderData = useMyCertifications()
    const isInit: boolean = !inProgress.length && !completed.length

    const allLearnMyingLink: ReactNode = (
        <span className={styles['title-link']}>
            <Button buttonStyle='link' label='See all my learning' />
        </span>
    )

    const resumeCourse: (certification: string, progress: LearnMyCertificationProgress) => void = useCallback((certification: string, progress: LearnMyCertificationProgress) => {
        if (!progress.currentLesson) {
            return
        }

        const [module, lesson]: Array<string> = (progress.currentLesson ?? '').split('/')

        const coursePath: string = [
            `course=${encodeURIComponent(certification)}`,
            `module=${encodeURIComponent(module)}`,
            `lesson=${encodeURIComponent(lesson)}`,
        ].filter(Boolean).join('&')
        navigate(`/learn/fcc?${coursePath}`)
    }, [])

    return (
        <div className={styles['wrap']}>
            {isInit && <InitState />}
            {!isInit && (
                <>
                    {!!inProgress.length && (
                        <div className={styles['title-line']}>
                            <h4 className='details'>In progress</h4>
                            {allLearnMyingLink}
                        </div>
                    )}
                    {inProgress.map((certif) => (
                        <InProgress
                            course={certif}
                            key={certif.key}
                            progress={certif.progress}
                            onClick={resumeCourse}
                        />
                    ))}
                    {!!completed.length && (
                        <div className={styles['title-line']}>
                            <LearningHat />
                            <h4 className='details'>Congratulations!</h4>
                            {!inProgress.length && allLearnMyingLink}
                        </div>
                    )}
                    {completed.map((certif) => (
                        <Completed course={certif} key={certif.key} completed={certif.progress.completedDate!} />
                    ))}
                </>
            )}
        </div>
    )
}

export default ProgressBlock
