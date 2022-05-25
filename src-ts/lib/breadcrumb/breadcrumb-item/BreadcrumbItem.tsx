import { Link } from '@reach/router'
import { FC } from 'react'

import { BreadcrumbItemModel } from './breadcrumb-item.model'

interface BreadcrumbItemProps {
    index: number
    item: BreadcrumbItemModel
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = (props: BreadcrumbItemProps) => {
    return (
        <li key={props.index}>
            <Link to={props.item.url}>
                {props.item.name}
            </Link>
        </li>
    )
}

export default BreadcrumbItem
