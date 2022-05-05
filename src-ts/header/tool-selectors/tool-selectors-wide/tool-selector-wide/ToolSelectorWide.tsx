import classNames from 'classnames'
import { FC, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ToolTitle } from '../../../../config'
import { PlatformRoute, routeContext, RouteContextData } from '../../../../lib'
import '../../../../lib/styles/index.scss'

import styles from './ToolSelectorWide.module.scss'

interface ToolSelectorWideProps {
    route: PlatformRoute
}

const ToolSelectorWide: FC<ToolSelectorWideProps> = (props: ToolSelectorWideProps) => {

    const { getPath, getPathFromRoute }: RouteContextData = useContext(routeContext)

    // for now, the work tool should be active for all pages except the account
    const isActive: boolean = !useLocation().pathname.startsWith(getPath(ToolTitle.settings))
    const activeIndicaterClass: string = `tool-selector-wide-${isActive ? '' : 'in'}active`

    return (
        <div className={classNames(styles['tool-selector-wide'], styles[activeIndicaterClass])}>
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
