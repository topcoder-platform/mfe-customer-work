/**
 * Modal
 *
 * Modal
 */
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";
import IconCross from "../../assets/images/icon-cross.svg";

const Modal = ({ children, show = false, handleClose = (f) => f }) => {
  return (
    show && (
      <div styleName={"modal"}>
        <div styleName="modal-back" onClick={(e) => handleClose(e)}></div>
        <div styleName="modal-inner">
          {children}
          <IconCross
            styleName="modal-close-btn"
            onClick={(e) => handleClose(e)}
          />
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  children: PT.node,
  show: PT.bool,
  handleClose: PT.func,
};

export default Modal;
