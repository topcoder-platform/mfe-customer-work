import { FC, MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react'
import { NavigateFunction, useNavigate, useSearchParams } from 'react-router-dom'

import { EnvironmentConfig } from '../../../config'
import {
    Breadcrumb,
    BreadcrumbItemModel,
    LoadingSpinner,
    Portal,
} from '../../../lib'
import { CollapsiblePane, CourseOutline } from '../components'
import {
    CoursesProviderData,
    LearnLesson,
    LearnModule,
    LessonProviderData,
    useCoursesProvider,
    useLessonProvider,
} from '../services'

import styles from './FreeCodeCamp.module.scss'
import { TitleNav } from './title-nav'

const FreeCodeCamp: FC<{}> = () => {
    const navigate: NavigateFunction = useNavigate()
    const frameRef: MutableRefObject<HTMLElement|any> = useRef()
    const [searchParams]: any = useSearchParams()

    const courseParam: string = searchParams.get('course')
    const moduleParam: string = searchParams.get('module')
    const lessonParam: string = searchParams.get('lesson')

    const {
        course: courseData,
        ready: courseDataReady,
    }: CoursesProviderData = useCoursesProvider(searchParams.get('course'))

    const { lesson, ready }: LessonProviderData = useLessonProvider(
        courseParam,
        moduleParam,
        lessonParam,
    )

    const breadcrumb: Array<BreadcrumbItemModel> = useMemo(() => [
        { url: '/learn', name: 'Topcoder Academy' },
        { url: `/learn/${lesson?.course.certification}`, name: lesson?.course.title ?? '' },
        { url: '/learn/fcc', name: lesson?.module.title ?? '' },
    ], [lesson])

    const currentModuleData: LearnModule|undefined = useMemo(() => {
        return courseData?.modules.find(d => d.key === moduleParam)
    }, [courseData, moduleParam])

    const currentStepIndex: number = useMemo(() => {
      if (!currentModuleData) {
          return 0
      }

      const lessonIndex: number = currentModuleData.lessons.findIndex(l => l.dashedName === lessonParam)
      return lessonIndex + 1
    }, [currentModuleData, lessonParam])

    const handleNavigate: (direction: number) => void = useCallback((direction = 1) => {

        const nextStep: LearnLesson|undefined = currentModuleData?.lessons[(currentStepIndex - 1) + direction]
        if (!nextStep) {
            return
        }

        navigate(`/learn/fcc?course=${courseParam}&module=${moduleParam}&lesson=${nextStep?.dashedName}`)
    }, [currentStepIndex, currentModuleData, courseParam, moduleParam])

    useEffect(() => {
        if (!frameRef.current || !lesson) {
            return
        }

        Object.assign(frameRef.current, {src: `${EnvironmentConfig.LEARN_SRC}/${lesson.lessonUrl}`})
    }, [lesson?.lessonUrl])

    return (
        <>
            {!ready && <LoadingSpinner />}
            <Breadcrumb items={breadcrumb} />

            {lesson && (
                <Portal portalId='page-subheader-portal-el'>
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
                                        currentStep={`${searchParams.get('module')}/${searchParams.get('lesson')}`}
                                    />
                                </div>
                            </CollapsiblePane>
                        </div>

                        <div className={styles['course-frame']}>
                            <TitleNav
                                title={currentModuleData?.meta.name}
                                currentStep={currentStepIndex}
                                maxStep={currentModuleData?.meta.lessonCount ?? 0}
                                onNavigate={handleNavigate}
                            />
                            <hr />
                            <iframe
                                className={styles.iframe}
                                ref={frameRef}
                            />
                        </div>
                    </div>
                </Portal>
            )}
        </>
    )
}

export default FreeCodeCamp
