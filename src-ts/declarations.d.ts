declare module '*.html' {
    const htmlFile: string
    export = htmlFile
}

declare module '*.scss' {
    const scssFile: { [style: string]: any }
    export = scssFile
}

declare module 'tc-auth-lib'

declare module '@topcoder/mfe-header'

declare module 'react-redux-toastr'
