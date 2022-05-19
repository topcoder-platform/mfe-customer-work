import classNames from 'classnames'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { IconOutline, PlatformRoute, routeIsActive } from '../../../../lib'

import styles from './ToolSelectorNarrow.module.scss'

interface ToolSelectorNarrowProps {
    route: PlatformRoute
}

const isParamRoute: (route: string) => boolean = (route: string) => !!route.match(/^:[^/]+$/)

const ToolSelectorNarrow: FC<ToolSelectorNarrowProps> = (props: ToolSelectorNarrowProps) => {

    const route: PlatformRoute = props.route
    const path: string = props.route.route

    const baseClass: string = 'tool-selector-narrow'
    const isActive: boolean = routeIsActive(useLocation().pathname, path)
    const activeIndicaterClass: string = `${baseClass}-${isActive ? '' : 'in'}active`
    const hasChildren: boolean = !!route.children.some(child => !!child.route && !child.uiHidden)

    return (
        <div className={styles[baseClass]}>
            <Link
                className={classNames(styles[`${baseClass}-link`], styles[activeIndicaterClass])}
                key={path}
                to={path}
            >
                {route.title}
                {hasChildren && <IconOutline.ChevronRightIcon />}
            </Link>
        </div>
    )
}

export default ToolSelectorNarrow
