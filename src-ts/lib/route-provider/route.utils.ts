export const routeRoot: string = '/work/dashboard'

export function routeIsActive(activePath: string, pathName: string, rootPath?: string): boolean {
    return activePath?.startsWith(pathName)
        && (pathName !== rootPath || activePath === rootPath)
}

export function routeIsHome(activePath: string): boolean {
    // TODO: make the alternate home route configurable
    return [routeRoot, '/self-service'].some(route => activePath === route)
}
