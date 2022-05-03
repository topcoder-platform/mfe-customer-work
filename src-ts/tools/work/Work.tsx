import { Dispatch, FC, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { NavigateFunction, Outlet, Routes, useNavigate } from 'react-router-dom'

import { resetIntakeForm } from '../../../src/actions/form'
import {
    clearAutoSavedForm,
    clearCachedChallengeId
} from '../../../src/autoSaveBeforeLogin'
import { ButtonProps, ContentLayout, routeContext, RouteContextData, WorkProvider } from '../../lib'

export const toolTitle: string = 'Work'

const Work: FC<{}> = () => {

    const { getChildRoutes }: RouteContextData = useContext(routeContext)
    const dispatch: Dispatch<any> = useDispatch()

    const navigate: NavigateFunction = useNavigate()

    function startWork(): void {
        clearCachedChallengeId()
        clearAutoSavedForm()
        dispatch(resetIntakeForm(true))
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
            title={'My Work'}
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
