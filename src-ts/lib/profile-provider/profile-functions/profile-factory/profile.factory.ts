import { TokenModel } from '../../../functions/token-functions'
import { UserProfile } from '../../user-profile.model'

import { UserRole } from './user-role.enum'

export function create(profile: UserProfile, token: TokenModel): UserProfile {
    profile.isCustomer = !!token.roles?.some(role => role === UserRole.customer)
    // TODO: all customers are currently marked as members. we'll need to figure
    // out how to distinguish actual members
    // https://topcoder.atlassian.net/browse/PROD-2069
    profile.isMember = !!token.roles?.some(role => role === UserRole.member)
    return profile
}
