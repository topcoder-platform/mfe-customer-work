import React from "react"
import PropType from "prop-types"

import { Modal } from "."

const SupportModal = ({ email, handle, handleClose }) => {
    return (
        <Modal 
            handleClose={handleClose}
            show={true}
            title="We're Here to Help"
        >
            <div style={{'text-align': 'center'}}>
                Hi {(handle || 'there')}, we're here to help. Please
                describe what you'd like to discuss, and a Topcoder
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
    handleClose: PropType.func.isRequired
}

export default SupportModal