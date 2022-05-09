import classNames from 'classnames'
import { FC, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ToolTitle } from '../../../../config'
import { PlatformRoute, routeContext, RouteContextData, routeIsActive, routeIsHome } from '../../../../lib'
import '../../../../lib/styles/index.scss'

import styles from './ToolSelectorWide.module.scss'

interface ToolSelectorWideProps {
    route: PlatformRoute
}

const ToolSelectorWide: FC<ToolSelectorWideProps> = (props: ToolSelectorWideProps) => {

    const { getPath, getPathFromRoute }: RouteContextData = useContext(routeContext)
    const currentPath: string = useLocation().pathname

    // for now, the work tool should be active for all pages except the account
    const isActive: boolean = !routeIsActive(currentPath, getPath(ToolTitle.settings))
    const activeIndicatorClass: string = `tool-selector-wide-${isActive ? '' : 'in'}active`

    // the tool link should be usable for all active routes except the home page
    const isLink: boolean = isActive && !routeIsHome(currentPath)

    return (
        <div className={classNames(
            styles['tool-selector-wide'],
            styles[activeIndicatorClass],
            isLink ? styles['tool-selector-wide-is-link'] : undefined
        )}>
            <Link
                className='large-tab'
                tabIndex={-1}
                to={getPathFromRoute(props.route)}
            >
                {props.route.title}
            </Link>
            <div className={styles['active-indicator']}></div>
        </div>
    )
}

export default ToolSelectorWide
