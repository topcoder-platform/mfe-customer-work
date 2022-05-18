import { PlatformRoute } from '../lib'

import { academyRoutes } from './academy'
import { workRoutes } from './work'

const toolRoutes: Array<PlatformRoute> = [
    // NOTE: these will be displayed in the order they are defined in this array
    // TODO: support ordering
    ...workRoutes,
    ...academyRoutes,
]

export default toolRoutes
