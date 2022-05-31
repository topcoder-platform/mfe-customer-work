import { FC, useContext } from 'react'
import { Outlet, Routes } from 'react-router-dom'

import {
    ContentLayout,
    LearnProviderContextProvider,
    routeContext,
    RouteContextData,
} from '../../lib'

export const toolTitle: string = 'Learn'

const Learn: FC<{}> = () => {

    const { getChildRoutes }: RouteContextData = useContext(routeContext)

    return (
        <ContentLayout>
            <LearnProviderContextProvider>
                <Outlet />
                <Routes>
                    {getChildRoutes(toolTitle)}
                </Routes>
            </LearnProviderContextProvider>
        </ContentLayout>
    )
}

export default Learn
