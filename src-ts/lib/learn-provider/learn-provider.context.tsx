import { Context, createContext, FC, ReactElement, ReactNode, useContext } from 'react'

export interface LearnProviderContextProps {
    children: ReactNode
}

export interface LearnProviderContextValue {}

const LearnProviderContext: Context<LearnProviderContextValue> = createContext({} as LearnProviderContextValue)

export function LearnProviderContextProvider({
  children,
  ...props
}: LearnProviderContextProps): ReactElement<LearnProviderContextValue> {

    return (
        <LearnProviderContext.Provider
            value={{
            }}
            {...props}
            >
            {children}
        </LearnProviderContext.Provider>
    )
}

export const useLearnProvider: () => LearnProviderContextValue = () => (
    useContext(LearnProviderContext)
)
