export interface UserProfile {
    competitionCountryCode: string
    createdAt: number
    email: string
    firstName: string
    handle: string
    handleLower: string
    homeCountryCode: string
    // TODO: figure out how determine role in PROD-2037
    isCustomer?: boolean
    isMember?: boolean
    lastName: string
    photoURL?: string
    status: string
    updatedAt: number
    userId: number
}
