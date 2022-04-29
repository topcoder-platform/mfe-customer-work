import { FC, ReactElement, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { Header } from './header'
import { ProfileProvider, routeContext, RouteContextData } from './lib'

const App: FC<{}> = () => {

    const { allRoutes }: RouteContextData = useContext(routeContext)

    const routeElements: Array<ReactElement> = allRoutes
        .map(route => {
            // if the route has children, add the wildcard to the path
            const path: string = `${route.route}${!route.children ? '' : '/*'}`
            return (<Route path={path} element={route.element} key={route.title} />)
        })

    return (
        <ProfileProvider>
            <Header />
            <Routes>
                {routeElements}
            </Routes >
            <ToastContainer
                position={toast.POSITION.TOP_RIGHT}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </ProfileProvider>
    )
}

export default App
