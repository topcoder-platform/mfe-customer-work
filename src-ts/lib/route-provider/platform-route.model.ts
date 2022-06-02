import { FC, SVGProps } from 'react'

export interface PlatformRoute {
    children: Array<PlatformRoute>
    customerOnly?: boolean
    element: JSX.Element
    enabled: boolean
    hide?: boolean
    icon?: FC<SVGProps<SVGSVGElement>>
    memberOnly?: boolean
    requireAuth?: boolean
    route: string
    title: string
}
