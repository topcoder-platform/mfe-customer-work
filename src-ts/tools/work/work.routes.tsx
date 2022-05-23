
import { PlatformRoute, routeRoot } from '../../lib'

import Work, { toolTitle } from './Work'
import { WorkTable } from './work-table'

export const workRoutes: Array<PlatformRoute> = [
    {
        children: [
            {
                children: [ ],
                element: <WorkTable />,
                enabled: true,
                route: '',
                title: toolTitle,
            },
            // there doesn't seem to be support for optional path params
            // in react-router-dom v6, so duplicating route
            // https://reactrouter.com/docs/en/v6/getting-started/overview
            {
                children: [ ],
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
        route: routeRoot,
        title: toolTitle,
    },
]
