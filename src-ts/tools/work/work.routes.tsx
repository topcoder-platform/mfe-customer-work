
import { PlatformRoute } from '../../lib'

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
        route: '/work/dashboard',
        title: toolTitle,
    },
]
