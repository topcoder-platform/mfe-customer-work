import { ChallengeMetadata } from './challenge-metadata.model'

export interface Challenge {
    created: string
    description: string
    id: string
    metadata: Array<ChallengeMetadata>
    name: string
    phases: Array<{
        name: string
    }>
    status: string
    tags: Array<string>
}
