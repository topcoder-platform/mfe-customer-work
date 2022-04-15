// tslint:disable-next-line: no-implicit-dependencies // TODO: create types
import { updateUserProfile } from '@topcoder/micro-frontends-navbar-app'

import { tokenGetAsync } from '../../functions/token-functions'
import { EditNameRequest } from '../edit-name-request.model'
import { UserProfile } from '../user-profile.model'

import { profileStoreGet, profileStorePutName } from './profile-store'

export async function getAsync(handle?: string): Promise<UserProfile | undefined> {
    handle = handle || (await tokenGetAsync())?.handle
    return !handle ? Promise.resolve(undefined) : profileStoreGet(handle)
}

export async function editNameAsync(handle: string, profile: EditNameRequest): Promise<any> {
    return profileStorePutName(handle, profile)
        .then(result => {
            updateUserProfile(result.firstName, result.lastName)
        })
}
