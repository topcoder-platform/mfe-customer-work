import { FC, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { routeContext, RouteContextData } from '../../../lib'

import { ToolSelectorWide } from './tool-selector-wide'
import styles from './ToolSelectorsWide.module.scss'

const ToolSelectorsWide: FC<{}> = () => {

    const { toolsRoutes, getRoutesForRole }: RouteContextData = useContext(routeContext)
    const activePath: string = useLocation().pathname

    const selectors: Array<JSX.Element> = getRoutesForRole(toolsRoutes, activePath)
        .map(route => (
            <ToolSelectorWide
                key={route.title}
                route={route}
            />
        ))

    return (
        <div className={styles['tool-selectors-wide']}>
            {selectors}
        </div>
    )
}

export default ToolSelectorsWide
