import { Dispatch, FC, SetStateAction, useContext, useState } from 'react'
import Modal from 'react-responsive-modal'

import { authUrlLogin, Button, Card, formOnReset } from '../../lib'
import { profileContext, ProfileContextData } from '../../lib/profile-provider'

import styles from './Account.module.scss'
import { ChangePassword, changePasswordFormDef } from './change-password'
import { EditName, editNameFormDef } from './edit-name'

const Account: FC<{}> = () => {

    const profileContextData: ProfileContextData = useContext(profileContext)
    const { profile, initialized }: ProfileContextData = profileContextData

    const [editProfileOpen, setEditNameOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
    const [changePasswordOpen, setChangePasswordOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    // TODO: create an auth provider
    // if we don't have a profile, don't show the page until it's initialized
    if (!profile) {
        // if we're already initialized, navigate to the login page
        if (initialized) {
            window.location.href = authUrlLogin('/self-service')
        }
        return <></>
    }

    function toggleEditName(): void {
        formOnReset(editNameFormDef.inputs)
        setEditNameOpen(!editProfileOpen)
    }

    function toggleChangePassword(): void {
        formOnReset(changePasswordFormDef.inputs)
        setChangePasswordOpen(!changePasswordOpen)
    }

    return (
        <div className={styles['page-container']}>

            <h1>Account Settings</h1>

            <div className={styles['page-content']}>

                <Card title='Account'>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Username:</strong> {profile.handle}</p>
                </Card>

                <Card
                    title='Name'
                    onClick={toggleEditName}
                >
                    <p>
                        {profile.firstName} {profile.lastName}
                    </p>
                    <Button
                        label='edit name'
                        onClick={toggleEditName}
                        tabIndex={1}
                        buttonStyle='secondary'
                    />
                </Card>

                <Modal
                    open={editProfileOpen}
                    onClose={toggleEditName}
                >
                    <EditName onClose={toggleEditName} />
                </Modal>

                <Card
                    onClick={toggleChangePassword}
                    title='Password'
                >
                    <p>
                        *******************
                    </p>
                    <Button
                        label='change password'
                        onClick={toggleChangePassword}
                        tabIndex={2}
                        buttonStyle='secondary'
                    />
                </Card>

                <Modal
                    open={changePasswordOpen}
                    onClose={toggleChangePassword}
                >
                    <ChangePassword onClose={toggleChangePassword} />
                </Modal>

            </div>
        </div>
    )
}

export default Account
