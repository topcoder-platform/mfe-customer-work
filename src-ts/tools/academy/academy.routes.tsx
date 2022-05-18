
import { PlatformRoute } from '../../lib'

import Academy, { toolTitle } from './Academy'
import { FreeCodeCamp } from './free-code-camp'

export const academyRoutes: Array<PlatformRoute> = [
    {
        children: [
            {
                children: [],
                element: <FreeCodeCamp />,
                enabled: true,
                route: '',
                title: toolTitle,
            },
        ],
        element: <Academy />,
        enabled: true,
        route: '/academy',
        title: toolTitle,
    },
]
