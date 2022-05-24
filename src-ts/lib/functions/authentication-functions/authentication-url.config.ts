import { EnvironmentConfig } from '../../../config'
import { routeSelfServiceRoot } from '../../route-provider'

export const authentication: string = EnvironmentConfig.URL.ACCOUNTS_APP_CONNECTOR

export function login(fallback: string): string {
    return `${authentication}?retUrl=${encodeURIComponent(window.location.href.match(/[^?]*/)?.[0] || fallback)}`
}

export const logout: string = `${authentication}?logout=true&retUrl=${encodeURIComponent('https://' + window.location.host)}${routeSelfServiceRoot}`

export function signup(fallback: string): string {
    return `${login(fallback)}&regSource=tcBusiness&mode=signUp`
}
