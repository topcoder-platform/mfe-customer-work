import { EnvironmentConfig } from '../../../../config'
import { Page } from '../../../pagination'

export function deleteWorkUrl(workId: string): string {
    return `${EnvironmentConfig.API.V5}/challenges/${workId}`
}

export function getWorkUrl(handle: string, page: Page): string {
    return `${EnvironmentConfig.API.V5}/challenges?createdBy=${handle}&perPage=${page.size}&page=${page.number}&selfService=true`
}
