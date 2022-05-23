// tslint:disable-next-line: no-implicit-dependencies // TODO: create types
import { updateUserProfile } from '@topcoder/mfe-header'

import { tokenGetAsync } from '../../functions/token-functions'
import { EditNameRequest } from '../edit-name-request.model'
import { UserProfile } from '../user-profile.model'

import { profileStoreGet, profileStorePatchName } from './profile-store'

export async function getAsync(handle?: string): Promise<UserProfile | undefined> {
    handle = handle || (await tokenGetAsync())?.handle
    const output: UserProfile | undefined = !handle ? await Promise.resolve(undefined) : await profileStoreGet(handle);
    // TODO: get real roles in PROD-2037
    // For now, these are hard-coded so everyone can see both tools.
    // Devs can toggle these on/off for dev as necessary.
    (output as UserProfile).isCustomer = true;
    (output as UserProfile).isMember = true
    return output
}

export async function editNameAsync(handle: string, profile: EditNameRequest): Promise<any> {
    return profileStorePatchName(handle, profile)
        .then(result => {
            updateUserProfile(result.firstName, result.lastName)
        })
}
