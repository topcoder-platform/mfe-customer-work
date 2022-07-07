import { GlobalConfig } from '../../lib'

import { AppHostEnvironment } from './app-host-environment.enum'
import { EnvironmentConfigDefault } from './environment.default.config'

export const EnvironmentConfigProd: GlobalConfig = {
    ...EnvironmentConfigDefault,
    API: {
        FORUM_V2: 'https://vanilla.topcoder.com/api/v2',
        V3: 'https://api.topcoder.com/v3',
        V5: 'https://api.topcoder.com/v5',
    },
    ENV: AppHostEnvironment.prod,
    TAG_MANAGER_ID: 'GTM-MXXQHG8',
    URL: {
        ACCOUNTS_APP_CONNECTOR: 'https://accounts-auth0.topcoder.com',
        PLATFORM_UI: 'https://platform-ui.topcoder.com',
    },
}
