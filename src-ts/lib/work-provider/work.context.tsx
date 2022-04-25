import { Context, createContext } from 'react'

import { WorkContextData } from './work-context-data.model'

export const defaultWorkContextData: WorkContextData = {
    deleteWorkAsync: () => Promise.resolve(),
    hasWork: false,
    initialized: false,
    work: [],
}

export const workContext: Context<WorkContextData> = createContext(defaultWorkContextData)

export default workContext
