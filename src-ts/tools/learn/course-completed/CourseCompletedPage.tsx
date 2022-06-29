import { FC, useContext, useEffect, useMemo } from 'react'
import { NavigateFunction, Params, useNavigate, useParams } from 'react-router-dom'

import {
    Breadcrumb,
    BreadcrumbItemModel,
    Button,
    ContentLayout,
    LoadingSpinner,
    profileContext,
    ProfileContextData
} from '../../../lib'
import {
    CoursesProviderData,
    CourseTitle,
    MyCertificationProgressProviderData,
    useCoursesProvider,
    useMyCertificationProgress
} from '../learn-lib'

import styles from './CourseCompletedPage.module.scss'

interface CourseCompletedPageProps {
}

const CourseCompletedPage: FC<CourseCompletedPageProps> = (props: CourseCompletedPageProps) => {

    const navigate: NavigateFunction = useNavigate()
    const routeParams: Params<string> = useParams()
    const { profile }: ProfileContextData = useContext(profileContext)

    const {
        course,
        ready: courseReady,
    }: CoursesProviderData = useCoursesProvider(routeParams.certification)

    const { certificateProgress: progress, ready: progressReady }: MyCertificationProgressProviderData = useMyCertificationProgress(profile?.userId, routeParams.certification)

    const ready = progressReady && courseReady

    const breadcrumb: Array<BreadcrumbItemModel> = useMemo(() => [
        { url: '/learn', name: 'Topcoder Academy' },
        { url: `/learn/${course?.certification}`, name: course?.title ?? '' },
        { url: `/learn/${course?.certification}/completed`, name: 'Congratulations!' },
    ], [course?.certification])

    // useEffect(() => {
    //   if (ready && progress?.status !== 'completed') {
    //     navigate(`/learn/${course?.certification}`)
    //   }
    // }, [ready, progress]);

    return (
        <ContentLayout>
            {!ready && (
                <div className={styles['wrap']}>
                    <LoadingSpinner />
                </div>
            )}
            <Breadcrumb items={breadcrumb} />
            {ready && course && (
                <div className={styles['wrap']}>
                    <h1>Congratulations!</h1>
                    <hr />
                    <div className="body-large">
                        You have successfully completed all Assessments for:
                    </div>
                    <CourseTitle size='lg' title={course.title} credits={course?.provider} type='webdev' />
                    <hr />
                    <p>
                        Now that you have completed the {course.title},
                        take a look at our other Topcoder Academy courses.
                        To view other courses, press the start a new course button below.
                    </p>
                    <div className={styles['btns-wrap']}>
                        <Button size='xs' buttonStyle='secondary' label='View certificate' route={`/learn/${course?.certification}/certificate`} />
                        <Button
                            size='xs'
                            buttonStyle='primary'
                            label='Start a new course'
                            route='/learn'
                        />
                    </div>
                    <p>
                        Completed courses in the Academy will reflect on your Topcoder profile.
                        This will make your Topcoder profile more attractive to potential employers via Gig work,
                        and shows the community how well you've progressed in completing learning courses.
                    </p>
                    <div className={styles['btns-wrap']}>
                        <Button
                            buttonStyle='link'
                            label='See your updated profile'
                            route='/profile'
                        />
                    </div>
                </div>
            )}
        </ContentLayout>
    )
}

export default CourseCompletedPage
