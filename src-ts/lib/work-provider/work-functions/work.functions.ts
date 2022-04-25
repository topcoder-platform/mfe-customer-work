import { messageGetAndSetForWorkItemsAsync } from '../../functions'
import { Page } from '../../pagination'

import { Work, workFactoryCreate, WorkStatus } from './work-factory'
import { Challenge, workStoreDeleteAsync, workStoreGetAsync } from './work-store'

export async function deleteAsync(workId: string): Promise<void> {
    return workStoreDeleteAsync(workId)
}

export async function getAsync(handle: string, page: Page): Promise<Array<Work>> {

    // get the response
    const challenges: Array<Challenge> = await workStoreGetAsync(handle, page)

    // run it through the factory and filter out deleted
    const workItems: Array<Work> = challenges
        .map(challenge => workFactoryCreate(challenge))
        .filter(work => work.status !== WorkStatus.deleted)

    // get and set the messages counts and return
    return messageGetAndSetForWorkItemsAsync(workItems, handle)
}
