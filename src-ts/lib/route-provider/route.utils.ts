export const routeRoot: string = '/work/dashboard'
export const routeSelfServiceRoot: string = '/self-service'
export const routeSelfServiceStart: string = `${routeSelfServiceRoot}/wizard`

export function routeIsActive(activePath: string, pathName: string, rootPath?: string): boolean {
    let isActive: boolean = isActivePath(activePath, pathName, rootPath)

    // temporarilily, if the path we're testing against is the work tool
    // also check if the current path is self-service
    if (!isActive && pathName.startsWith(routeRoot)) {
        isActive = isActivePath(activePath, routeSelfServiceRoot)
    }

    return isActive
}

export function routeIsHome(activePath: string): boolean {
    // TODO: make the alternate home route configurable
    return [routeRoot, routeSelfServiceRoot].some(route => activePath === route)
}

export function routeWorkDetails(workId: string): string {
    return `${routeSelfServiceRoot}/work-items/${workId}`
}

function isActivePath(activePath: string, pathName: string, rootPath?: string): boolean {
    return activePath?.startsWith(pathName)
        && (pathName !== rootPath || activePath === rootPath)
}
