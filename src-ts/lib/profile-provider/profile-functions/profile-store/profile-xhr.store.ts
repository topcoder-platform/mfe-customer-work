import { xhrGetAsync, xhrPutAsync } from '../../../functions/xhr-functions'
import { EditNameRequest } from '../../edit-name-request.model'
import { UserProfile } from '../../user-profile.model'

import { profile as profileUrl } from './profile-endpoint.config'

export function get(handle: string): Promise<UserProfile> {
    return xhrGetAsync<UserProfile>(profileUrl(handle))
}

export function put(handle: string, profile: EditNameRequest): Promise<UserProfile> {
    return xhrPutAsync<EditNameRequest, UserProfile>(profileUrl(handle), profile)
}
