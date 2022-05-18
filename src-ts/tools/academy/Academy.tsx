import { FC, useContext } from 'react'
import { Outlet, Routes } from 'react-router-dom'

import {
    ContentLayout,
    routeContext,
    RouteContextData,
} from '../../lib'

export const toolTitle: string = 'Academy'

const Academy: FC<{}> = () => {

    const { getChildRoutes }: RouteContextData = useContext(routeContext)

    return (
        <ContentLayout title={`Topcoder ${toolTitle}`}>
            <Outlet />
            <Routes>
                {getChildRoutes(toolTitle)}
            </Routes>
        </ContentLayout>
    )
}

export default Academy
