
import { PlatformRoute } from '../../lib'

import { FreeCodeCamp } from './free-code-camp'
import Learn, { toolTitle } from './Learn'

export const learnRoutes: Array<PlatformRoute> = [
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
        element: <Learn />,
        enabled: true,
        memberOnly: true,
        route: '/learn',
        title: toolTitle,
    },
]
