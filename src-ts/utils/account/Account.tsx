import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import Modal from 'react-responsive-modal'

import { authUrlLogin, Button, Card, IconOutline } from '../../lib'
import { profileContext, ProfileContextData } from '../../lib/profile-provider'

import styles from './Account.module.scss'
import { PasswordReset } from './password-reset'
import { ProfileUpdate } from './profile-update'

const Account: FC<{}> = () => {

    const profileContextData: ProfileContextData = useContext(profileContext)
    const { profile, initialized }: ProfileContextData = profileContextData

    const [editProfileOpen, setEditProfileOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
    const [resetPasswordOpen, setResetPasswordOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    // TODO: create an auth provider
    // if we don't have a profile, don't show the page until it's initialized
    if (!profile) {
        // if we're already initialized, navigate to the login page
        if (initialized) {
            window.location.href = authUrlLogin('/self-service')
        }
        return <></>
    }

    function toggleEditProfile(): void {
        setEditProfileOpen(!editProfileOpen)
    }

    function toggleResetPassword(): void {
        setResetPasswordOpen(!resetPasswordOpen)
    }

    return (
        <div className={styles['page-container']}>

            <h1>Account Settings</h1>

            <div className={styles['page-content']}>

                <Card
                    icon={IconOutline.UserIcon}
                    title='Account'
                >
                    <div>{profile.handle}</div>
                    <div>{profile.email}</div>
                </Card>

                <Card
                    icon={IconOutline.UserIcon}
                    title='Name'
                >
                    <div>{profile.firstName} {profile.lastName}</div>
                    <Button
                        label='edit name'
                        onClick={toggleEditProfile}
                        tabIndex={1}
                        buttonStyle='secondary'
                    />
                </Card>

                <Modal
                    open={editProfileOpen}
                    onClose={toggleEditProfile}
                >
                    <ProfileUpdate onClose={toggleEditProfile} />
                </Modal>

                <Card
                    icon={IconOutline.LockClosedIcon}
                    title='Password'
                >
                    <div>*******************</div>
                    <Button
                        label='change password'
                        onClick={toggleResetPassword}
                        tabIndex={2}
                        buttonStyle='secondary'
                    />
                </Card>

                <Modal
                    open={resetPasswordOpen}
                    onClose={toggleResetPassword}
                >
                    <PasswordReset onClose={toggleResetPassword} />
                </Modal>

            </div>
        </div>
    )
}

export default Account
