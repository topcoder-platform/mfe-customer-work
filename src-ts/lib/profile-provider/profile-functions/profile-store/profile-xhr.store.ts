import { xhrGetAsync, xhrPutAsync } from '../../../functions/xhr-functions'
import { EditNameRequest } from '../../edit-name-request.model'
import { UserProfile } from '../../user-profile.model'

import { profile as profileUrl } from './profile-endpoint.config'

export function get(handle: string): Promise<UserProfile> {
    return xhrGetAsync<UserProfile>(profileUrl(handle))
}

// TODO: this should prob be a patch, not a put, bc the
// request body is just a partial profile
export function putName(handle: string, request: EditNameRequest): Promise<UserProfile> {
    return xhrPutAsync<EditNameRequest, UserProfile>(profileUrl(handle), request)
}
