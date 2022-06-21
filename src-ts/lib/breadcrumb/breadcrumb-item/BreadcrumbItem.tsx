import { Link } from '@reach/router'
import { FC } from 'react'

import { BreadcrumbItemModel } from './breadcrumb-item.model'
import styles from './../Breadcrumb.module.scss'

interface BreadcrumbItemProps {
    index: number
    item: BreadcrumbItemModel
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = (props: BreadcrumbItemProps) => {
    return (
        <li key={props.index}>
            <Link className={props.item.isElipsis && styles['elipsis']} to={props.item.url}>
                {props.item.name}
            </Link>
        </li>
    )
}

export default BreadcrumbItem
