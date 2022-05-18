import { Dispatch, FC, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, NavigateFunction, Outlet, Routes, useNavigate } from 'react-router-dom'

import { resetIntakeForm } from '../../../src/actions/form'
import {
    clearAutoSavedForm,
    clearCachedChallengeId
} from '../../../src/autoSaveBeforeLogin'
import {
    ButtonProps,
    ContentLayout,
    LoadingSpinner,
    profileContext,
    ProfileContextData,
    routeContext,
    RouteContextData,
    routeSelfServiceRoot,
    routeSelfServiceStart,
    WorkProvider,
} from '../../lib'

export const toolTitle: string = 'Work'

const Work: FC<{}> = () => {

    const { getChildRoutes }: RouteContextData = useContext(routeContext)
    const { profile, initialized }: ProfileContextData = useContext(profileContext)
    const dispatch: Dispatch<any> = useDispatch()
    const navigate: NavigateFunction = useNavigate()

    // if a user arrives here who is not logged in, don't let them get to the page
    if (!profile) {

        // if the profile isn't initialized, wait with the spinner
        if (!initialized) {
            return <LoadingSpinner />
        }

        // if the profile is initialized, go to the self-service login
        return <Navigate to={routeSelfServiceRoot} />
    }

    function startWork(): void {
        clearCachedChallengeId()
        clearAutoSavedForm()
        dispatch(resetIntakeForm(true))
        // TODO: add the start work page to the route provider context
        navigate(routeSelfServiceStart)
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
