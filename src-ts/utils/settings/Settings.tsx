import { FC, useContext } from 'react'
import { Outlet, Routes } from 'react-router-dom'

import { ContentLayout, routeContext, RouteContextData } from '../../lib'

export const toolTitle: string = 'Account Settings'

const Settings: FC<{}> = () => {

    const { getChildRoutes }: RouteContextData = useContext(routeContext)

    return (
        <ContentLayout title={toolTitle}>
            <>
                <Outlet />
                <Routes>
                    {getChildRoutes(toolTitle)}
                </Routes>
            </>
        </ContentLayout>
    )
}

export default Settings
