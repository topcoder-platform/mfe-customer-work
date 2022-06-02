import { FC, MutableRefObject, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import { EnvironmentConfig } from '../../../config'
import {
    Breadcrumb,
    BreadcrumbItemModel,
    CoursesProviderData,
    LessonProviderData,
    LoadingSpinner,
    Portal,
    useCoursesProvider,
    useLessonProvider,
} from '../../../lib'
import { CollapsiblePane, CourseOutline } from '../components'

import styles from './FreeCodeCamp.module.scss'

const FreeCodeCamp: FC<{}> = () => {
    const frameRef: MutableRefObject<HTMLElement|any> = useRef()
    const [searchParams]: any = useSearchParams()

    const {
        course: courseData,
        ready: courseDataReady,
    }: CoursesProviderData = useCoursesProvider(searchParams.get('course'))
    
    const { lesson, ready }: LessonProviderData = useLessonProvider(
        searchParams.get('course'),
        searchParams.get('module'),
        searchParams.get('lesson'),
    )

    const breadcrumb: Array<BreadcrumbItemModel> = useMemo(() => [
        { url: '/learn', name: 'Topcoder Academy' },
        { url: `/learn/${lesson?.course.certification}`, name: lesson?.course.title ?? '' },
        { url: '/learn/fcc', name: lesson?.module.title ?? '' },
    ], [lesson])

    useEffect(() => {
        if (!frameRef.current || !lesson) {
            return;
        }

        Object.assign(frameRef.current, {src: `${EnvironmentConfig.LEARN_SRC}/${lesson.lessonUrl}`});
    }, [lesson?.lessonUrl]);

    return (
        <>
            {!ready && <LoadingSpinner />}
            <Breadcrumb items={breadcrumb} />

            {lesson && (
                <Portal portalId='page-subheader-portal-el'>
                    <div className={styles['iframe-wrap']}>
                        <CollapsiblePane title='Course Outline'>
                            <CourseOutline
                                course={courseData}
                                ready={courseDataReady}
                                currentStep={`${searchParams.get('module')}/${searchParams.get('lesson')}`}
                            />
                        </CollapsiblePane>
                        <iframe
                            className={styles.iframe}
                            ref={frameRef}
                        />
                    </div>
                </Portal>
            )}
        </>
    )
}

export default FreeCodeCamp
