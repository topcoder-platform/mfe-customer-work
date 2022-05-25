import { FC } from 'react'

import { Portal } from '../../../lib'

import { CoursesCard } from './courses-card'
import { ProgressCard } from './progress-card'
import styles from './WelcomePage.module.scss'

interface WelcomePageProps {
}

const WelcomePage: FC<WelcomePageProps> = (props: WelcomePageProps) => {

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
                            <div className={styles['hero-col']}>
                                <ProgressCard />
                            </div>
                        </div>
                    </div>
                </div>
            </Portal>

            <div className={styles['courses-section']}>
                <h3 className='details'>Courses Available</h3>
                <div className={styles['courses-list']}>
                    <CoursesCard
                        title='Responsive Web Design'
                        credits='freeCodeCamp'
                        type='webdev'
                        link='/learn/course'
                    />
                    <CoursesCard
                        title='Javascript Alrhorithms & Data Structures'
                        type='webdev'
                    />
                    <CoursesCard
                        title='Front End Development Libraries'
                        type='webdev'
                    />
                    <CoursesCard
                        title='Back End Development APIs'
                        type='webdev'
                    />
                </div>
            </div>
        </div>
    )
}

export default WelcomePage
