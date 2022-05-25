import { FC, useMemo } from 'react'

import { Breadcrumb, BreadcrumbItemModel, Portal } from '../../../lib'

import styles from './FreeCodeCamp.module.scss'

const FreeCodeCamp: FC<{}> = () => {
    const breadcrumb: Array<BreadcrumbItemModel> = useMemo(() => [
        { url: '/learn', name: 'Topcoder Academy' },
        { url: '/learn/course', name: 'Responsive Web Design' },
        { url: '/learn/fcc', name: 'Very first lesson in course' },
    ], [])

    // TODO: environment-specific URLS
    return (
        <>
            <Breadcrumb items={breadcrumb} />

            <Portal portalId='page-subheader-portal-el'>
                <div className={styles['iframe-wrap']}>
                    <iframe
                        className={styles.iframe}
                        src='http://localhost:8000/learn/2022/responsive-web-design/learn-html-by-building-a-cat-photo-app/step-1'
                    />
                </div>
            </Portal>
        </>
    )
}

export default FreeCodeCamp
