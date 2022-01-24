import React from "react"
import PropType from "prop-types"
import { Modal } from "react-responsive-modal"

import styles from "./SupportModal.module.scss"

const SupportModal = ({ handleClose, email = null, handle = null}) => {
    return (
        <Modal 
            onClose={handleClose}
            open={true} 
            showCloseIcon={false}
        >
            <div className={styles.titleContainer}>
                We're Here to Help
            </div>
            <div>
                Hi {(handle || 'there')}, we're here to help. Please
                describe what you'd like to discuss and a Topcoder
                Solutions Expert will email you back
                {(email ? ` at ${email}` : '')}
                &nbsp;within one business day.
            </div>
            <div>
                {/* TODO: form & button */}
            </div>
        </Modal>
    )
}

SupportModal.propTypes = {
    email: PropType.string,
    handle: PropType.string,
    handleClose: PropType.func,
}

export default SupportModal