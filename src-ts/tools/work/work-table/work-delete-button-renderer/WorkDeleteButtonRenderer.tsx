import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import {
    Button,
    ConfirmModal,
    IconOutline,
    Tooltip,
} from '../../../../lib'
import '../../../../lib/styles/index.scss'
import { Work, workContext, WorkContextData, WorkStatus } from '../../work-lib'

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
            <Tooltip
                content='Delete'
                positionX='middle'
                positionY='end'
                triggerOn='hover'
                trigger={(
                    <Button
                        buttonStyle='icon'
                        icon={IconOutline.TrashIcon}
                        onClick={toggleConfirmation}
                        tabIndex={-1}
                    />
                )}
            />

            <ConfirmModal
                title='Delete Draft'
                action='delete'
                onClose={toggleConfirmation}
                onConfirm={deleteWork}
                open={confirmationOpen}
            >
                Are you sure you would like to delete your draft work?
                This action can not be undone and will permanently remove your work.
            </ConfirmModal>
        </>
    )
}

export default WorkDeleteButtonRenderer
