import { FC } from 'react'

import styles from './FreeCodeCamp.module.scss'

const FreeCodeCamp: FC<{}> = () => {
    // TODO: environment-specific URLS
    return (
        <iframe
            className={styles.iframe}
            src='http://localhost:8000'
        />
    )
}

export default FreeCodeCamp
