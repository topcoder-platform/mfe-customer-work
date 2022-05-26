import { FC, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Breadcrumb, BreadcrumbItemModel, LessonProviderData, LoadingSpinner, Portal, useLessonProvider } from '../../../lib'

import styles from './FreeCodeCamp.module.scss'

const FreeCodeCamp: FC<{}> = () => {
    const [searchParams]: any = useSearchParams()

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

    // TODO: environment-specific URLS
    return (
        <>
            {!ready && <LoadingSpinner />}
            <Breadcrumb items={breadcrumb} />

            {lesson && (
                <Portal portalId='page-subheader-portal-el'>
                    <div className={styles['iframe-wrap']}>
                        <iframe
                            className={styles.iframe}
                            src={`http://localhost:8000/${lesson.lessonUrl}`}
                        />
                    </div>
                </Portal>
            )}
        </>
    )
}

export default FreeCodeCamp
