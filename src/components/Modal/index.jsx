/**
 * Modal
 *
 * Modal
 */
import React from "react";
import PT from "prop-types";

import styles from "./styles.module.scss";
import IconCross from "../../assets/images/icon-cross.svg";

// TODO: figure out why this export is needed 
// https://github.com/topcoder-platform/micro-frontends-self-service-app/issues/74 
export const Modal = (
  { 
    children,
    handleClose = (f) => f,
    hideClose = false,
    show = false, 
    title
  }
) => {
  return (
    show && (
      <div styleName="modalContainer">

        <div
          styleName="modalBackground"
          onClick={(e) => handleClose(e)}
          role="button"
          tabIndex={0}
        ></div>

        <div styleName="modalContent">

          <div className={styles.titleContainer}>
            {title}
          </div>

          {children}

          {!hideClose && (
            <IconCross
              styleName="modalCloseBtn"
              onClick={(e) => handleClose(e)}
            />
          )}
          </div>

      </div>
    )
  );
};

Modal.propTypes = {
  children: PT.node,
  handleClose: PT.func,
  hideClose: PT.bool,
  show: PT.bool,
  title: PT.string
};

export default Modal;
