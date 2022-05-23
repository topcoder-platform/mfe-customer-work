import {
    Dispatch,
    FC,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react'
import { Route } from 'react-router-dom'

import { authUrlLogin } from '../functions'
import { profileContext, ProfileContextData } from '../profile-provider'

import { PlatformRoute } from './platform-route.model'
import { RequireAuthProvider } from './require-auth-provider'
import { RouteContextData } from './route-context-data.model'
import { default as routeContext, defaultRouteContextData } from './route.context'
import { routeRoot } from './route.utils'

interface RouteProviderProps {
    children: ReactNode
    toolsRoutes: Array<PlatformRoute>
    utilsRoutes: Array<PlatformRoute>
}

export const RouteProvider: FC<RouteProviderProps> = (props: RouteProviderProps) => {

    const profileContextData: ProfileContextData = useContext(profileContext)
    const { profile, initialized }: ProfileContextData = profileContextData

    const [routeContextData, setRouteContextData]: [RouteContextData, Dispatch<SetStateAction<RouteContextData>>]
        = useState<RouteContextData>(defaultRouteContextData)

    let allRoutes: Array<PlatformRoute> = []

    const getAndSetRoutes: () => void = () => {

        // TODO: try to make these prop names configurable instead of hard-coded
        const toolsRoutes: Array<PlatformRoute> = props.toolsRoutes
            .filter(route => initialized
                && route.enabled
                && (!route.customerOnly || !!profile?.isCustomer)
                && (!route.memberOnly || !!profile?.isMember)
            )
        const utilsRoutes: Array<PlatformRoute> = props.utilsRoutes
            .filter(route => route.enabled)
        allRoutes = [
            ...toolsRoutes,
            ...utilsRoutes,
        ]
        const contextData: RouteContextData = {
            allRoutes,
            getChildRoutes,
            getChildren,
            getPath,
            getPathFromRoute,
            getRouteElement,
            toolsRoutes,
            utilsRoutes,
        }
        setRouteContextData(contextData)
    }

    function getChildren(parent: string): Array<PlatformRoute> {
        return allRoutes
            .find(route => route.title === parent)
            ?.children
            || []
    }

    function getChildRoutes(parent: string): Array<ReactElement> {
        return getChildren(parent)
            .map(route => getRouteElement(route))
    }

    function getPath(routeTitle: string): string {
        const platformRoute: PlatformRoute = allRoutes.find(route => route.title === routeTitle) as PlatformRoute
        // if the path has a trailing asterisk, remove it
        return getPathFromRoute(platformRoute)
    }

    function getPathFromRoute(route: PlatformRoute): string {
        return route.route.replace('/*', '')
    }

    function getRouteElement(route: PlatformRoute): JSX.Element {

        // create the route element
        const routeElement: JSX.Element = !route.requireAuth
            ? route.element
            : (
                <RequireAuthProvider loginUrl={authUrlLogin(routeRoot)}>
                    {route.element}
                </RequireAuthProvider>
            )

        // if the route has children, add the wildcard to the path
        const path: string = `${route.route}${!route.children ? '' : '/*'}`

        // return the route
        return (
            <Route
                element={routeElement}
                key={route.title}
                path={path}
            />
        )
    }

    useEffect(() => {
        getAndSetRoutes()
    }, [
        initialized,
        props.toolsRoutes,
        props.utilsRoutes,
    ])

    return (
        <routeContext.Provider value={routeContextData}>
            {props.children}
        </routeContext.Provider>
    )
}
