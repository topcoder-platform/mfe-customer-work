import { FC, useContext } from 'react'
import { NavigateFunction, Outlet, Routes, useNavigate } from 'react-router-dom'

import { ButtonProps, ContentLayout, routeContext, RouteContextData, WorkProvider } from '../../lib'

export const toolTitle: string = 'Work'

const Work: FC<{}> = () => {

    const { getChildRoutes }: RouteContextData = useContext(routeContext)

    const navigate: NavigateFunction = useNavigate()

    function startWork(): void {
        // TODO: add the start work page to the route provider context
        navigate('/self-service/wizard')
    }

    const buttonConfig: ButtonProps = {
        label: 'Start work',
        onClick: startWork,
    }

    return (
        <ContentLayout
            buttonConfig={buttonConfig}
            title={toolTitle}
        >
            <WorkProvider>
                <Outlet />
                <Routes>
                    {getChildRoutes(toolTitle)}
                </Routes>
            </WorkProvider>
        </ContentLayout>
    )
}

export default Work
