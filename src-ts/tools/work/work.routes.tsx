
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
        ],
        element: <Work />,
        enabled: true,
        requireAuth: true,
        route: routeRoot,
        title: toolTitle,
    },
]
