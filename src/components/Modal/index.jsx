/**
 * Modal
 *
 * Modal
 */
import React from "react";
import PT from "prop-types";

import styles from "./styles.module.scss";
import IconCross from "../../assets/images/icon-cross.svg";

export const Modal = (
  { 
    children,
    handleClose = (f) => f,
    show = false, 
    title
  }
) => {

  return (
    show && (
      <div styleName="modal">

        <div
          styleName="modal-back"
          onClick={(e) => handleClose(e)}
          role="button"
          tabIndex={0}
        ></div>

        <div styleName="modal-inner">

          <div className={styles.titleContainer}>
            {title}
          </div>

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
