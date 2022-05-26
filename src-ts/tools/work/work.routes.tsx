import { PlatformRoute } from '../../lib'

import Work, { toolTitle } from './Work'
import { WorkTable } from './work-table'

export const selfServiceRootRoute: string = '/self-service'
export const selfServiceStartRoute: string = `${selfServiceRootRoute}/wizard`

export function workDetailRoute(workId: string, tab?: string): string {
    return `${selfServiceRootRoute}/work-items/${workId}${!!tab ? `\?tab=${tab}` : ''}`
}

export const workRootRoute: string = '/work/dashboard'

export const workRoutes: Array<PlatformRoute> = [
    {
        children: [
            {
                children: [],
                element: <WorkTable />,
                enabled: true,
                route: '',
                title: toolTitle,
            },
            // there doesn't seem to be support for optional path params
            // in react-router-dom v6, so duplicating route
            // https://reactrouter.com/docs/en/v6/getting-started/overview
            {
                children: [],
                element: <WorkTable />,
                enabled: true,
                route: ':statusKey',
                title: toolTitle,
            },
        ],
        customerOnly: true,
        element: <Work />,
        enabled: true,
        requireAuth: true,
        route: workRootRoute,
        title: toolTitle,
    },
]
