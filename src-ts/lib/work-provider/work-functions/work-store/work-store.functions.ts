import { xhrDeleteAsync, xhrGetAsync } from '../../../functions'
import { Page } from '../../../pagination'

import { Challenge } from './challenge.model'
import { deleteWorkUrl, getWorkUrl } from './work.config'

export async function deleteAsync(workId: string): Promise<void> {
    return xhrDeleteAsync(deleteWorkUrl(workId))
}

export async function getAsync(handle: string, page: Page): Promise<Array<Challenge>> {
    return xhrGetAsync<Array<Challenge>>(getWorkUrl(handle, page))
}
