import React from "react"
import PropType from "prop-types"
import { Modal } from "react-responsive-modal"

const SupportModal = ({ isLoggedIn = false, handleClose }) => {
    return (
        <Modal 
            open={true} 
            onClose={handleClose}
        >
            <div>this is the support modal</div>
            <div>and i am currently logged in === {isLoggedIn}</div>
        </Modal>
    )
}

SupportModal.propTypes = {
    isLoggedIn: PropType.bool,
    handleClose: PropType.func,
}

export default SupportModal