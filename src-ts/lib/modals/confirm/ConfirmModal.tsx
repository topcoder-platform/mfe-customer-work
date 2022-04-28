import { FC } from 'react'
import Modal, { ModalProps } from 'react-responsive-modal'

import { Button } from '../../button'
import { IconOutline } from '../../svgs'

import styles from './ConfirmModal.module.scss'

export interface ConfirmModalProps extends ModalProps {
    action?: string
    onConfirm: () => void
    title: string
}

const ConfirmModal: FC<ConfirmModalProps> = ({
    children,
    title,
    onConfirm,
    action = 'Confirm',
    ...props
}: ConfirmModalProps) => {
    return (
        <Modal
            {...props}
            closeIcon={<IconOutline.XIcon width={28} height={28} />}
        >
            <div className={styles['modal-header']}>
                <h4 className='details'>{title}</h4>
            </div>

            <hr className={styles['spacer']} />

            <div className={styles['modal-body']}>
                {children}
            </div>

            <div className={styles['button-container']}>
                <Button
                    label='Cancel'
                    onClick={props.onClose}
                    tabIndex={1}
                    buttonStyle='secondary'
                    size='lg'
                />
                <Button
                    buttonStyle='primary'
                    label={action}
                    onClick={onConfirm}
                    tabIndex={2}
                    size='lg'
                />
            </div>

        </Modal>
    )
}

export default ConfirmModal
