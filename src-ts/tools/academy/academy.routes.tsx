
import { PlatformRoute } from '../../lib'

import Academy, { toolTitle } from './Academy'

export const academyRoutes: Array<PlatformRoute> = [
    {
        children: [ ],
        element: <Academy />,
        enabled: true,
        requireAuth: true,
        route: '/academy',
        title: toolTitle,
    },
]
