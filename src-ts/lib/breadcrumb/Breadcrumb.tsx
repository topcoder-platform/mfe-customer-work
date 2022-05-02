import { FC } from 'react'

import { BreadcrumbItem, BreadcrumbItemModel } from './breadcrumb-item'
import styles from './Breadcrumb.module.scss'

interface BreadcrumbProps {
    items: Array<BreadcrumbItemModel>
}

const Breadcrumb: FC<BreadcrumbProps> = (props: BreadcrumbProps) => {
    return (
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
    )
}

export default Breadcrumb
