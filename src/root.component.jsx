import { EnvironmentConfig } from "../src-ts"

export default function Root() {
    const redirectUrl = `${EnvironmentConfig.URL.PLATFORM_UI}${window.location.pathname}`
    window.location.href = redirectUrl
    return <></>
}
