import { FC, useContext } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import {
    authUrlLogout,
    profileContext,
    ProfileContextData,
    routeContext,
    RouteContextData,
} from '../../../../../../lib'

import styles from './ProfilePanel.module.scss'

interface ProfilePanelProps {
    settingsTitle: string
    toggleProfilePanel: () => void
}

const ProfilePanel: FC<ProfilePanelProps> = (props: ProfilePanelProps) => {

    const { profile }: ProfileContextData = useContext(profileContext)
    const { getPath }: RouteContextData = useContext(routeContext)

    const navigate: NavigateFunction = useNavigate()

    if (!profile) {
        // this should never happen
        return <></>
    }

    function goToAccount(): void {
        props.toggleProfilePanel()
        navigate(getPath(props.settingsTitle))
    }

    const name: string = `${profile.firstName} ${profile.lastName?.substring(0, 1)}${!!profile.lastName ? '.' : undefined}`

    return (
        <div className={styles['profile-panel']}>
            <div className={styles.handle}>
                {name}
            </div>
            <div
                className={styles.profile}
                onClick={goToAccount}
            >
                {props.settingsTitle}
            </div>
            <a
                href={authUrlLogout}
                className={styles.logout}
            >
                Log Out
            </a>
        </div>
    )
}

export default ProfilePanel
