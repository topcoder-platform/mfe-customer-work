import { Dispatch, SetStateAction, useContext, useState } from 'react'
import Modal from 'react-responsive-modal'
import { toast } from 'react-toastify'

import {
    Button,
    IconOutline,
    Work,
    workContext,
    WorkContextData,
    WorkStatus,
} from '../../../lib'
import '../../../lib/styles/index.scss'

function WorkDeleteButtonRenderer(work: Work): JSX.Element | undefined {

    const workContextData: WorkContextData = useContext(workContext)
    const { deleteWorkAsync }: WorkContextData = workContextData

    const [confirmationOpen, setConfirmationOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

    // if the item is in draft status, don't display anything
    if (work.status !== WorkStatus.draft) {
        return undefined
    }

    async function deleteWork(): Promise<void> {
        toggleConfirmation()
        await deleteWorkAsync(work.id)
        toast.success('Your draft work has been deleted.')
    }

    function toggleConfirmation(): void {
        setConfirmationOpen(!confirmationOpen)
    }

    return (
        <>
            <Button
                buttonStyle='icon'
                icon={IconOutline.TrashIcon}
                onClick={toggleConfirmation}
                title='Delete'
            />

            <Modal
                onClose={toggleConfirmation}
                open={confirmationOpen}
            >
                <h2>Delete Draft</h2>
                <hr />

                <div>
                    Are you sure you would like to delete your draft work?
                    This action can not be undone and will permanently remove your work.
                </div>

                <div className='button-container'>
                    <Button
                        label='Cancel'
                        onClick={toggleConfirmation}
                        tabIndex={1}
                        buttonStyle='secondary'
                    />
                    <Button
                        buttonStyle='primary'
                        label='Delete'
                        onClick={deleteWork}
                        tabIndex={2}
                    />
                </div>

            </Modal>
        </>

    )
}

export default WorkDeleteButtonRenderer
