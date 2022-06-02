import { FC } from 'react'

import { Button, LearnCertification, LearningHat } from '../../../../lib';

import { Completed } from './completed';
import { InProgress } from './in-progress';
import InitState from './init-state/InitState';

import styles from './ProgressBlock.module.scss'

interface ProgressBlockProps {
}

const ProgressBlock: FC<ProgressBlockProps> = (props: ProgressBlockProps) => {
    const inProgress: LearnCertification[] = [{
        category: "Web Development",
        certification: "responsive-web-design",
        id: "abcd-1234-e0987-6543",
        key: "responsive-web-design-certification",
        providerId: "561add10cb82ac38a17513bc",
        providerName: "freeCodeCamp",
        state: "active",
        title: "Responsive Web Design Certification",
    } as any]
    const completed: LearnCertification[] = [{
        category: "Web Development",
        certification: "responsive-web-design",
        id: "abcd-1234-e0987-6543",
        key: "responsive-web-design-certification",
        providerId: "561add10cb82ac38a17513bc",
        providerName: "freeCodeCamp",
        state: "active",
        title: "Web Design Certification",
    } as any]
    const isInit: boolean = !inProgress.length && !completed.length

    const allMyLearningLink = (
        <span className={styles['title-link']}>
            <Button buttonStyle='link' label='See all my learning' />
        </span>
    )

    return (
        <div className={styles['wrap']}>
            {isInit && <InitState />}
            {!isInit && (
                <>
                    {!!inProgress.length && (
                        <div className={styles['title-line']}>
                            <h4 className='details'>In progress</h4>
                            {allMyLearningLink}
                        </div>
                    )}
                    {inProgress.map((certif) => (
                        <InProgress course={certif} key={certif.key} progress={Math.random()} />
                    ))}
                    {!!completed.length && (
                        <div className={styles['title-line']}>
                            <LearningHat />
                            <h4 className='details'>Congratulations!</h4>
                            {!inProgress.length && allMyLearningLink}
                        </div>
                    )}
                    {completed.map((certif) => (
                        <Completed course={certif} key={certif.key} completed={new Date('2022-06-24')} />
                    ))}
                </>
            )}
        </div>
    )
}

export default ProgressBlock
