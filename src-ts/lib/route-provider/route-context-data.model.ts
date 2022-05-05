import { ReactElement } from 'react'

import { PlatformRoute } from './platform-route.model'

export interface RouteContextData {
    allRoutes: Array<PlatformRoute>
    getChildren: (parent: string) => Array<PlatformRoute>
    getChildRoutes: (parent: string) => Array<ReactElement>
    getPath: (routeTitle: string) => string
    getPathFromRoute: (route: PlatformRoute) => string
    getRouteElement: (route: PlatformRoute) => JSX.Element
    toolsRoutes: Array<PlatformRoute>
    utilsRoutes: Array<PlatformRoute>
}
