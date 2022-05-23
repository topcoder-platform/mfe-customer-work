import { PlatformRoute } from '../lib'

import { learnRoutes } from './learn'
import { workRoutes } from './work'

const toolRoutes: Array<PlatformRoute> = [
    // NOTE: these will be displayed in the order they are defined in this array
    // TODO: support ordering
    ...workRoutes,
    ...learnRoutes,
]

export default toolRoutes
