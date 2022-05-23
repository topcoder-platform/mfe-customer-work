import { FC, useContext } from 'react'
import { Outlet, Routes } from 'react-router-dom'

import {
    ContentLayout,
    routeContext,
    RouteContextData,
} from '../../lib'

export const toolTitle: string = 'Learn'

const Learn: FC<{}> = () => {

    const { getChildRoutes }: RouteContextData = useContext(routeContext)

    return (
        <ContentLayout title={`Topcoder Academy`}>
            <Outlet />
            <Routes>
                {getChildRoutes(toolTitle)}
            </Routes>
        </ContentLayout>
    )
}

export default Learn
