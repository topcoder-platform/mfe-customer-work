import { Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { NavigateFunction, Params, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import {
    Breadcrumb,
    BreadcrumbItemModel,
    LoadingSpinner,
    Portal,
    profileContext,
    ProfileContextData,
} from '../../../lib'
import {
    CourseOutline,
    CoursesProviderData,
    LearnLesson,
    LearnModule,
    LessonProviderData,
    MyCertificationProgressProviderData,
    startMyCertificationsProgressAsync,
    updateMyCertificationsProgressAsync,
    UpdateMyCertificateProgressActions,
    useCoursesProvider,
    useLessonProvider,
    useMyCertificationProgress,
} from '../learn-lib'
import { getFccLessonPath } from '../learn.routes'

import { CollapsiblePane } from './collapsible-pane'
import { FccFrame } from './fcc-frame'
import styles from './FreeCodeCamp.module.scss'
import { TitleNav } from './title-nav'

const FreeCodeCamp: FC<{}> = () => {
    const { profile }: ProfileContextData = useContext(profileContext)

    const navigate: NavigateFunction = useNavigate()
    const routeParams: Params<string> = useParams()

    const providerParam = routeParams.provider ?? ''
    const [certificationParam, setCourseParam]: [string, Dispatch<SetStateAction<string>>] = useState(routeParams.certification ?? '')
    const [moduleParam, setModuleParam]: [string, Dispatch<SetStateAction<string>>] = useState(routeParams.module ?? '')
    const [lessonParam, setLessonParam]: [string, Dispatch<SetStateAction<string>>] = useState(routeParams.lesson ?? '')

    const { certificateProgress, setCertificateProgress }: MyCertificationProgressProviderData = useMyCertificationProgress(profile?.userId, routeParams.provider, certificationParam)

    const {
        course: courseData,
        ready: courseDataReady,
    }: CoursesProviderData = useCoursesProvider(providerParam, certificationParam)

    const { lesson, ready }: LessonProviderData = useLessonProvider(
        providerParam,
        certificationParam,
        moduleParam,
        lessonParam,
    )

    const breadcrumb: Array<BreadcrumbItemModel> = useMemo(() => [
        { url: '/learn', name: 'Topcoder Academy' },
        { url: `/learn/${providerParam}/${lesson?.course.certification}`, name: lesson?.course.title ?? '' },
        { url: '/learn/fcc', name: lesson?.module.title ?? '' },
    ], [providerParam, lesson])

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

        const lessonPath: string = getFccLessonPath(
            providerParam,
            certificationParam,
            moduleParam,
            nextStep.dashedName,
        )
        navigate(lessonPath)
    }, [providerParam, currentStepIndex, currentModuleData, certificationParam, moduleParam])

    function updatePath(lessonPath: string, modulePath: string, coursePath: string): void {
        if (coursePath !== certificationParam) { setCourseParam(coursePath) }
        if (modulePath !== moduleParam) { setModuleParam(modulePath) }
        if (lessonPath !== lessonParam) { setLessonParam(lessonPath) }

        if (lessonPath !== lessonParam || modulePath !== moduleParam || coursePath !== certificationParam) {
            const nextLessonPath: string = getFccLessonPath(
                providerParam,
                coursePath,
                modulePath,
                lessonPath
            );
            window.history.replaceState('', '', nextLessonPath)
        }
    }

    function handleFccLessonReady(lessonPath: string): void {
        const [nLessonPath, modulePath, coursePath]: Array<string> = lessonPath.replace(/\/$/, '').split('/').reverse()
        updatePath(nLessonPath, modulePath, coursePath)

        const currentLesson: {[key: string]: string} = {
            lesson: nLessonPath,
            module: modulePath,
        }

        if (!certificateProgress) {
            startMyCertificationsProgressAsync(
                profile?.userId!,
                lesson?.course.certificationId!,
                lesson?.course.id!,
                currentLesson
            ).then(setCertificateProgress)
        } else {
            updateMyCertificationsProgressAsync(
                certificateProgress.id,
                UpdateMyCertificateProgressActions.currentLesson,
                currentLesson
            ).then(setCertificateProgress)
        }
    }

    function handleFccLessonComplete(): void {
        const currentLesson: {[key: string]: string} = {
            lesson: lessonParam,
            module: moduleParam,
        }
        if (certificateProgress) {
            updateMyCertificationsProgressAsync(
                certificateProgress.id,
                UpdateMyCertificateProgressActions.completeLesson,
                currentLesson
            ).then(setCertificateProgress)
        }
    }

    useEffect(() => {
      if (certificateProgress && certificateProgress.completedPercentage === 1 && certificateProgress.status === 'in-progress') {
        updateMyCertificationsProgressAsync(
            certificateProgress.id,
            UpdateMyCertificateProgressActions.completeCertificate,
            {}
        ).then(setCertificateProgress)
      }
    }, [certificateProgress]);

    useEffect(() => {
        const certificationPath: string = routeParams.certification ?? ''
        const modulePath: string = routeParams.module ?? ''
        const lessonPath: string = routeParams.lesson ?? ''

        if (certificationPath !== certificationParam) { setCourseParam(certificationPath) }
        if (modulePath !== moduleParam) { setModuleParam(modulePath) }
        if (lessonPath !== lessonParam) { setLessonParam(lessonPath) }
    }, [routeParams])

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
                                        currentStep={`${moduleParam}/${lessonParam}`}
                                        progress={certificateProgress}
                                    />
                                </div>
                            </CollapsiblePane>
                        </div>

                        <div className={styles['course-frame']}>
                            <TitleNav
                                title={currentModuleData?.meta.name}
                                currentStep={currentStepIndex}
                                maxStep={currentModuleData?.lessons.length ?? 0}
                                onNavigate={handleNavigate}
                            />
                            <hr />
                            <FccFrame
                                lesson={lesson}
                                onFccLessonChange={handleFccLessonReady}
                                onFccLessonComplete={handleFccLessonComplete}
                            />
                        </div>
                    </div>
                </Portal>
            )}
        </>
    )
}

export default FreeCodeCamp
