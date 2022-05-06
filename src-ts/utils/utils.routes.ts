import { PlatformRoute } from '../lib'

import { settingsRoutes } from './settings'

const utilsRoutes: Array<PlatformRoute> = [
    ...settingsRoutes,
]

export default utilsRoutes
