// import { messageGetAndSetForWorkItemsAsync } from '../../functions'
import { Page } from '../../pagination'

import { Work, workFactoryCreate, WorkStatus, WorkType } from './work-factory'
import { Challenge, workStoreDeleteAsync, workStoreGetAsync } from './work-store'

export async function deleteAsync(workId: string): Promise<void> {
    return workStoreDeleteAsync(workId)
}

export async function getAsync(handle: string, page: Page): Promise<Array<Work>> {

    // get the response
    const challenges: Array<Challenge> = await workStoreGetAsync(handle, page)

    // run it through the factory and filter out deleted and non-self-service
    const workItems: Array<Work> = challenges
        .map(challenge => workFactoryCreate(challenge))
        .filter(work => work.status !== WorkStatus.deleted && work.type !== WorkType.unknown)

    return workItems

    /*
        TODO: add this data back to the work object when the bug is fixed:
        https://topcoder.atlassian.net/browse/PROD-1860
        Unread Messages count from API don't match embedded forum widget
    // get and set the messages counts and return
    return messageGetAndSetForWorkItemsAsync(workItems, handle)
    */
}
