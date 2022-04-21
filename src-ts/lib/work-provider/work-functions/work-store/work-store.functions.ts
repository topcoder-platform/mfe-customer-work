import { xhrDeleteAsync, xhrGetAsync } from '../../../functions'
import { Page } from '../../../pagination'

import { Challenge } from './challenge.model'
import { deleteUrl, getUrl } from './work-url.config'

export async function deleteAsync(workId: string): Promise<void> {
    return xhrDeleteAsync(deleteUrl(workId))
}

export async function getAsync(handle: string, page: Page): Promise<Array<Challenge>> {
    return xhrGetAsync<Array<Challenge>>(getUrl(handle, page))
}
