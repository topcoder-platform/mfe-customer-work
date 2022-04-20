export interface ChallengeMetadata {
    name: string
    value: string
}

export interface Challenge {
    cost?: number
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
