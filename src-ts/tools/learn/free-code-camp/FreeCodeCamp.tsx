import { FC, memo, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
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
    LessonProviderData,
    useCoursesProvider,
    useLessonProvider,
} from '../services'

import styles from './FreeCodeCamp.module.scss'

const FreecodecampIfr: FC<any> = memo((params: any) => (
    <iframe
        className={styles.iframe}
        ref={params.frameRef}
    />
))

const FreeCodeCamp: FC<{}> = () => {
    const [searchParams]: any = useSearchParams()
    // const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    

    const frameRef: MutableRefObject<HTMLElement|any> = useRef()
    const r = useRef<any>(false);
    const [courseParam, setCourseParam] = useState(searchParams.get('course') ?? '');
    const [moduleParam, setModuleParam] = useState(searchParams.get('module') ?? '');
    const [lessonParam, setLessonParam] = useState(searchParams.get('lesson') ?? '');

    const {
        course: courseData,
        ready: courseDataReady,
    }: CoursesProviderData = useCoursesProvider(courseParam)

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

    useEffect(() => {
        if (!frameRef.current || !lesson) {
            return
        }
        Object.assign(frameRef.current, {src: `${EnvironmentConfig.LEARN_SRC}/${lesson.lessonUrl}`})
    }, [lesson?.lessonUrl])

    useEffect(() => {
      if (!frameRef) {
          return;
      }
      const handleEvent = (event: any) => {
        const { data: jsonData, origin } = event;
        if (origin.indexOf(EnvironmentConfig.LEARN_SRC) === -1) {
            return;
        }

        const {event: eventName, data} = JSON.parse(jsonData);
        if (eventName === 'fcc:challenge:ready') {
            const [lessonPath, modulePath, coursePath] =data.nextChallengePath.split('/').reverse();
            
            r.current = true;
            if (lessonPath !== lessonParam || modulePath !== moduleParam || coursePath !== courseParam) {
                if (coursePath !== courseParam) setCourseParam(coursePath);
                if (modulePath !== moduleParam) setModuleParam(modulePath);
                if (lessonPath !== lessonParam) setLessonParam(lessonPath);
            }
            window.history.replaceState('', '', `?course=${coursePath}&module=${modulePath}&lesson=${lessonPath}`)
        }
      };
  
      window.addEventListener('message', handleEvent, false);
      return function cleanup() {
        window.removeEventListener('message', handleEvent, false);
      };
    }, [frameRef, lessonParam, moduleParam, courseParam]);

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
                                currentStep={`${moduleParam}/${lessonParam}`}
                            />
                        </CollapsiblePane>
                        <FreecodecampIfr frameRef={frameRef} />
                    </div>
                </Portal>
            )}
        </>
    )
}

export default FreeCodeCamp
