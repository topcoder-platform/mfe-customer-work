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
import { CollapsiblePane } from '../free-code-camp/collapsible-pane'
import {
    CourseOutline,
    CoursesProviderData,
    CourseTitle,
    MyCertificationProgressProviderData,
    useCoursesProvider,
    useMyCertificationProgress
} from '../learn-lib'
import { getCoursePath } from '../learn.routes'

import styles from './CourseCompletedPage.module.scss'

interface CourseCompletedPageProps {
}

const CourseCompletedPage: FC<CourseCompletedPageProps> = (props: CourseCompletedPageProps) => {

    const navigate: NavigateFunction = useNavigate()
    const routeParams: Params<string> = useParams()
    const { profile }: ProfileContextData = useContext(profileContext)
    const providerParam: string = routeParams.provider ?? ''
    const certificationParam: string = routeParams.certification ?? ''
    const coursePath = getCoursePath(providerParam, certificationParam)

    const {
        course: courseData,
        ready: courseDataReady,
    }: CoursesProviderData = useCoursesProvider(providerParam, certificationParam)

    const { certificateProgress: progress, ready: progressReady }: MyCertificationProgressProviderData = useMyCertificationProgress(profile?.userId, routeParams.provider, routeParams.certification)

    const ready = progressReady && courseDataReady

    const breadcrumb: Array<BreadcrumbItemModel> = useMemo(() => [
        { url: '/learn', name: 'Topcoder Academy' },
        { url: coursePath, name: courseData?.title ?? '' },
        { url: `/learn/completed`, name: 'Congratulations!' },
    ], [coursePath])

    useEffect(() => {
      if (ready && progress?.status !== 'completed') {
        navigate(coursePath)
      }
    }, [ready, progress, coursePath]);

    return (
        <>
            {!ready && <LoadingSpinner />}

            {ready && courseData && (
                <>
                    <Breadcrumb items={breadcrumb} />
                    <div className={styles['main-wrap']}>
                        <div className={styles['course-outline-pane']}>
                            <CollapsiblePane title='Course Outline'>
                                <div className={styles['course-outline-wrap']}>
                                    <div className={styles['course-outline-title']}>
                                        {courseData?.title}
                                    </div>
                                    <CourseOutline
                                        course={courseData}
                                        ready={courseDataReady}
                                        currentStep=''
                                        progress={progress}
                                    />
                                </div>
                            </CollapsiblePane>
                        </div>
        
                        <div className={styles['course-frame']}>
                            <div className={styles['content-wrap']}>
                                <h1>Congratulations!</h1>
                                <hr />
                                <div className="body-large">
                                    You have successfully completed all Assessments for:
                                </div>
                                <CourseTitle size='xl' title={courseData.title} credits={courseData.provider} type='webdev' />
                                <hr />
                                <p>
                                    Now that you have completed the {courseData.title},
                                    take a look at our other Topcoder Academy courses.
                                    To view other courses, press the start a new course button below.
                                </p>
                                <div className={styles['btns-wrap']}>
                                    <Button size='sm' buttonStyle='secondary' label='View certificate' route={`/learn/${courseData.certification}/certificate`} />
                                    <Button
                                        size='sm'
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
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default CourseCompletedPage
