import { FC, useContext, useMemo } from 'react'

import { ContentLayout, Portal, profileContext } from '../../../lib'
import {
    CertificationsProviderData,
    LearnCertification,
    LearningHat,
    MyCertificationsProviderData,
    MyCourseCompletedCard,
    MyCourseInProgressCard,
    useCertificationsProvider,
    useMyCertifications,
    WaveHero
} from '../learn-lib'

import { HeroCard } from './hero-card'
import styles from './MyLearning.module.scss'

interface MyLearningProps {
}

const MyLearning: FC<MyLearningProps> = (props: MyLearningProps) => {
    const { profile } = useContext(profileContext)
    const { completed, inProgress }: MyCertificationsProviderData = useMyCertifications(profile?.userId)

    const {
        certifications,
        ready,
    }: CertificationsProviderData = useCertificationsProvider()

    const certificatesById: {[key: string]: LearnCertification} = useMemo(() => (
        certifications.reduce((certifs, certificate) => (
            certifs[certificate.id] = certificate,
            certifs
        ), {} as {[key: string]: LearnCertification})
    ), [certifications])

    return (
        <ContentLayout contentClass={styles['content-layout']}>
            <div className={styles['wrap']}>
                <Portal portalId='page-subheader-portal-el'>
                    <WaveHero
                        title='my learning'
                        text={`
                            This is your very own page to keep track of your professional education and skill building.
                            From here you can resume your courses in progress or review past accomplishments.
                        `}
                    >
                        <HeroCard />
                    </WaveHero>
                </Portal>

                <div className={styles['courses-area']}>
                    {inProgress.map((certif) => (
                        <MyCourseInProgressCard
                            certification={certificatesById[certif.certificationId]}
                            key={certif.certificationId}
                            theme='detailed'
                            currentLesson={certif.currentLesson!}
                            completed={certif.completed}
                            startDate={certif.startDate!}
                        />
                    ))}
                </div>

                <div className={styles['courses-area']}>
                    {!!completed.length && (
                        <div className={styles['title-line']}>
                            <LearningHat />
                            <h2 className='details'>Completed Courses</h2>
                        </div>
                    )}

                    <div className={styles['cards-wrap']}>
                        {completed.map((certif) => (
                            <MyCourseCompletedCard
                                certification={certificatesById[certif.certificationId]}
                                key={certif.certificationId}
                                completed={certif.completedDate!}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </ContentLayout>
    )
}

export default MyLearning
