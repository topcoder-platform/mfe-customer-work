/**
 * FormInputTextArea
 *
 * Form Input textarea
 */
import cn from "classnames";
import React from "react";
import "./styles.module.scss";

// TODO: figure out why this export is needed 
// https://github.com/topcoder-platform/micro-frontends-self-service-app/issues/74 
export const FormInputTextArea = ({ styleName, ...props }) => {
  return (
    <textarea
      styleName={cn("form-input-textarea", styleName || "")}
      {...props}
      cols={10}
    />
  );
};

FormInputTextArea.propTypes = {};

export default FormInputTextArea;
