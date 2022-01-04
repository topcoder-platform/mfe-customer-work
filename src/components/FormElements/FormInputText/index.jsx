/**
 * FormInputText
 *
 * Form Input Type=text
 */
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";

const FormInputText = ({ styleName, ...props }) => {
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
