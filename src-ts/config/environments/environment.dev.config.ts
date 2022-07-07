import { GlobalConfig } from '../../lib'

import { AppHostEnvironment } from './app-host-environment.enum'
import { EnvironmentConfigDefault } from './environment.default.config'

export const EnvironmentConfigDev: GlobalConfig = {
    ...EnvironmentConfigDefault,
    DISABLED_TOOLS: [ ],
    ENV: AppHostEnvironment.dev,
    TAG_MANAGER_ID: 'GTM-W7B537Z',
    URL: {
        PLATFORM_UI: 'https://platform-ui.topcoder-dev.com',
    },
}
