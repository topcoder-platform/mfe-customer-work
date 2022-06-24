import { Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'

import { Page, profileContext, ProfileContextData, UserProfile } from '../../../../lib'

import { WorkContextData } from './work-context-data.model'
import { Work, workDeleteAsync, workFactoryCreate, workFactoryGetStatus, workGetAsync } from './work-functions'
import { default as workContext, defaultWorkContextData } from './work.context'

export const WorkProvider: FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {

    const [workContextData, setWorkContextData]: [WorkContextData, Dispatch<SetStateAction<WorkContextData>>]
        = useState<WorkContextData>(defaultWorkContextData)

    const profileContextData: ProfileContextData = useContext(profileContext)
    const { profile }: ProfileContextData = profileContextData

    async function deleteWorkAsync(workId: string): Promise<void> {
        await workDeleteAsync(workId)
        await getAndSetWork()
    }

    async function getAndSetWork(): Promise<void> {

        try {
            // TODO: actual pagination and sorting
            const page: Page = {
                number: 1,
                size: 100,
                sort: {
                    direction: 'desc',
                    fieldName: 'created',
                },
            }
            const work: Array<Work> = await workGetAsync((profile as UserProfile).handle, page)

            const contextData: WorkContextData = {
                createFromChallenge: workFactoryCreate,
                deleteWorkAsync,
                getStatusFromChallenge: workFactoryGetStatus,
                hasWork: !!work.length,
                initialized: true,
                work,
            }
            setWorkContextData(contextData)

        } catch (error: any) {
            const contextData: WorkContextData = {
                createFromChallenge: workFactoryCreate,
                deleteWorkAsync,
                error: error.response?.data?.result?.content || error.message || error,
                getStatusFromChallenge: workFactoryGetStatus,
                hasWork: false,
                initialized: true,
                work: [],
            }
            setWorkContextData(contextData)
        }
    }

    useEffect(() => {

        if (!!workContextData.initialized || !profile) {
            return
        }

        getAndSetWork()

    }, [
        workContextData.initialized,
        profile,
    ])

    return (
        <workContext.Provider value={workContextData}>
            {children}
        </workContext.Provider>
    )
}
