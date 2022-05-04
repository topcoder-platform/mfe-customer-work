import { FC } from 'react'

import styles from './Header.module.scss'
import { Logo } from './logo'
import { ToolSelectors } from './tool-selectors'
import { UtilitySelectors } from './utility-selectors'

const Header: FC<{}> = () => {
    return (
        <div className={styles['header-wrap']}>
            <header className={styles.header}>
                <ToolSelectors isWide={false} />
                <Logo />
                <ToolSelectors isWide={true} />
                <UtilitySelectors />
            </header>
        </div>
    )
}

export default Header
