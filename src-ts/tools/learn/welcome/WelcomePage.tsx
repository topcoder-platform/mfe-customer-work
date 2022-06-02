import classNames from 'classnames'
import { FC } from 'react'

import { LoadingSpinner, Portal } from '../../../lib'
import { CertificationsProviderData, useCertificationsProvider } from '../services'

import { CoursesCard } from './courses-card'
import { ProgressBlock } from './progress-block'
import styles from './WelcomePage.module.scss'

interface WelcomePageProps {
}

const WelcomePage: FC<WelcomePageProps> = (props: WelcomePageProps) => {
    const {
        certifications,
        ready,
    }: CertificationsProviderData = useCertificationsProvider()

    return (
        <div className={styles.wrap}>
            <Portal portalId='page-subheader-portal-el'>
                <div className={styles['hero-wrap']}>
                    <div className={styles['hero-inner']}>
                        <div className={styles['hero-content']}>
                            <div className={styles['hero-col']}>
                                <h1>Welcome to Topcoder ACADEMY</h1>
                                <p className={styles['hero-text']}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Diam sit amet nisl suscipit. Ullamcorper sit amet risus nullam eget.
                                    Etiam erat velit scelerisque in dictum non consectetur a.
                                    Mauris pellentesque pulvinar pellentesque habitant morbi.
                                    Tortor pretium viverra suspendisse potenti nullam ac.
                                </p>
                            </div>
                            <div className={classNames(styles['hero-col'], styles['progress-col'])}>
                                <ProgressBlock />
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>

            <div className={styles['courses-section']}>
                <h3 className='details'>Courses Available</h3>
                {!ready && (
                    <LoadingSpinner />
                )}

                {ready && (
                    <div className={styles['courses-list']}>
                        {certifications.map((certification) => (
                            <CoursesCard
                                title={certification.title}
                                type={certification.category}
                                link={certification.state === 'active' ? certification.certification : undefined}
                                credits={certification.providerName}
                                key={certification.key}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default WelcomePage
