import classNames from 'classnames'
import { FC, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
    PlatformRoute,
    routeContext,
    RouteContextData,
    routeIsActive,
    routeIsHome,
} from '../../../../lib'
import '../../../../lib/styles/index.scss'

import styles from './ToolSelectorWide.module.scss'

interface ToolSelectorWideProps {
    route: PlatformRoute
}

const ToolSelectorWide: FC<ToolSelectorWideProps> = (props: ToolSelectorWideProps) => {

    const { getPathFromRoute }: RouteContextData = useContext(routeContext)
    const activePath: string = useLocation().pathname
    const toolRoute: PlatformRoute = props.route
    const toolPath: string = getPathFromRoute(toolRoute)

    const isActive: boolean = routeIsActive(activePath, toolPath)

    const activeIndicatorClass: string = `tool-selector-wide-${isActive ? '' : 'in'}active`

    // the tool link should be usable for all active routes except the home page
    const isLink: boolean = isActive && !routeIsHome(activePath)

    return (
        <div className={classNames(
            styles['tool-selector-wide'],
            styles[activeIndicatorClass],
            isLink ? styles['tool-selector-wide-is-link'] : undefined
        )}>
            <Link
                className='large-tab'
                tabIndex={-1}
                to={toolPath}
            >
                {toolRoute.title}
            </Link>
            <div className={styles['active-indicator']}></div>
        </div>
    )
}

export default ToolSelectorWide
