import { decodeToken } from 'tc-auth-lib'

import { authInitializeAsync } from '../authentication-functions'
import { logError } from '../logging-functions'

import { TokenModel } from './token.model'

export async function getAsync(): Promise<TokenModel> {

    const token: string | undefined = await authInitializeAsync()

    // if there is no token, no need to try to get the handle
    if (!token) {
        return Promise.resolve({})
    }

    try {
        const { handle }: { handle?: string } = decodeToken(token)

        // if we didn't find the handle, we have a bad token
        if (!handle) {
            logError(`token did not have a handle: ${token}`)
            return Promise.resolve({})
        }

        return Promise.resolve({ handle, token })

    } catch (error: any) {
        logError(error)
        return Promise.resolve({})
    }
}
