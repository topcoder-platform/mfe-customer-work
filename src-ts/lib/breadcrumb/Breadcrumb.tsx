import { FC } from 'react'
import { createPortal } from 'react-dom'

import { BreadcrumbItem, BreadcrumbItemModel } from './breadcrumb-item'
import styles from './Breadcrumb.module.scss'

interface BreadcrumbProps {
    items: Array<BreadcrumbItemModel>
}

const Breadcrumb: FC<BreadcrumbProps> = (props: BreadcrumbProps) => {
    const portalRootEl: HTMLElement|null = document.getElementById('page-subheader-portal-el')

    if (!portalRootEl) {
        return <></>
    }

    return createPortal((
        <div className={styles['breadcrumb-wrap']}>
            <nav className={styles.breadcrumb}>
                <ol>
                    {props.items.map((item, index) =>
                        <BreadcrumbItem
                            index={index + 1}
                            item={item}
                            key={index}
                        />
                    )}
                </ol>
            </nav>
        </div>
    ), portalRootEl)
}

export default Breadcrumb
