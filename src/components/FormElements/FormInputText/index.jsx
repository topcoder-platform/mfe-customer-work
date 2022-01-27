/**
 * FormInputText
 *
 * Form Input Type=text
 */
import cn from "classnames";
import React from "react";
import "./styles.module.scss";

// TODO: figure out why this export is needed 
// https://github.com/topcoder-platform/micro-frontends-self-service-app/issues/74 
export const FormInputText = ({ styleName, ...props }) => {
  return (
    <input
      type="text"
      styleName={cn("form-input-text", styleName || "")}
      {...props}
    />
  );
};

FormInputText.propTypes = {};

export default FormInputText;
