export const routeRoot: string = '/self-service'

export const routeIsActive: (activePath: string, pathName: string, rootPath?: string) => boolean
    = (activePath: string, pathName: string, rootPath: string = routeRoot) => {

        return activePath?.startsWith(pathName)
            && (pathName !== rootPath || activePath === rootPath)
    }
