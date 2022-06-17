
import { PlatformRoute } from '../../lib'

import { CourseDetailsPage } from './course-details'
import { FreeCodeCamp } from './free-code-camp'
import Learn, { toolTitle } from './Learn'
import { WelcomePage } from './welcome'

interface IGetFccLessonPathParams {
    course: string
    lesson: string
    module: string
}
export const getFccLessonPath: (params: IGetFccLessonPathParams) => string = (params: IGetFccLessonPathParams) => (
    `/learn/fcc?course=${params.course}&module=${params.module}&lesson=${params.lesson}`
)

export const learnRoutes: Array<PlatformRoute> = [
    {
        children: [
            {
                children: [],
                element: <WelcomePage />,
                enabled: true,
                route: '',
                title: toolTitle,
            },
            {
                children: [],
                element: <CourseDetailsPage />,
                enabled: true,
                route: ':certification',
                title: toolTitle,
            },
            {
                children: [],
                element: <FreeCodeCamp />,
                enabled: true,
                route: 'fcc',
                title: toolTitle,
            },
        ],
        element: <Learn />,
        enabled: true,
        memberOnly: true,
        route: '/learn',
        title: toolTitle,
    },
]
