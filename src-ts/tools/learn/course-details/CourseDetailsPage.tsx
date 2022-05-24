import { FC, useMemo } from 'react'

import { Breadcrumb, BreadcrumbItemModel } from '../../../lib'

import { CourseCurriculum } from './course-curriculum'
import { CourseTitle } from './course-title'
import styles from './CourseDetailsPage.module.scss'

interface CourseDetailsPageProps {
}

const CourseDetailsPage: FC<CourseDetailsPageProps> = (props: CourseDetailsPageProps) => {

    const breadcrumb: Array<BreadcrumbItemModel> = useMemo(() => [
        { url: '/learn', name: 'Topcoder Academy' },
        { url: '/learn/course', name: 'Responsive Web Design' },
    ], [])

    return (
        <>
            <Breadcrumb items={breadcrumb} />
            <div className={styles['wrap']}>
                <div className={styles['main']}>
                    <div className={styles['description']}>
                        <CourseTitle title='Responsive Web Design' credits='freeCodeCamp' type='webdev' />

                        <div className={styles['text']}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Diam sit amet nisl suscipit. Ullamcorper sit amet risus nullam eget.
                            Etiam erat velit scelerisque in dictum non consectetur a. Mauris pellentesque pulvinar pellentesque
                            habitant morbi. Morbi enim nunc faucibus a pellentesque sit. Tortor pretium viverra suspendisse
                            potenti nullam ac. Ullamcorper malesuada proin libero nunc. Adipiscing elit duis tristique
                            sollicitudin nibh sit amet commodo. Orci a scelerisque purus semper eget duis at tellus at.
                        </div>

                        <h3 className='details'>Why should you complete this course?</h3>

                        <div className={styles['text']}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Diam sit amet nisl suscipit. Ullamcorper sit amet risus nullam eget.
                            Etiam erat velit scelerisque in dictum non consectetur a. Mauris pellentesque pulvinar pellentesque
                            habitant morbi. Morbi enim nunc faucibus a pellentesque sit. Tortor pretium viverra suspendisse
                            potenti nullam ac. Ullamcorper malesuada proin libero nunc. Adipiscing elit duis tristique
                            sollicitudin nibh sit amet commodo. Orci a scelerisque purus semper eget duis at tellus at.
                        </div>
                    </div>
                </div>
                <div className={styles['aside']}>
                    <CourseCurriculum />
                </div>
            </div>
        </>
    )
}

export default CourseDetailsPage
