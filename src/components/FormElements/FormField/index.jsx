/**
 * FormField
 *
 * A Form Field Is a wrapper for input to add the label to it
 */
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";

const FormField = ({
  children,
  label = "",
  placeholder = "",
  onChange = (f) => f,
  className,
  styleName,
  ...props
}) => {
  const handleClick = (e) => {
    // focus on input label click
    const inputElement = e.target.closest(".form-field").querySelector("input");
    inputElement && inputElement.focus();
  };
  return (
    <div
      className={cn("form-field-wrapper", className || "")}
      styleName={cn("form-field-wrapper", styleName || "")}
    >
      <div className={cn("form-field")} styleName={cn("form-field")} {...props}>
        <div styleName="label" onClick={handleClick}>
          {label}
        </div>
        {children}
      </div>
      <div className="error" styleName="error">
        {props.error}
      </div>
    </div>
  );
};

FormField.propTypes = {
  onChange: PT.func,
  label: PT.string,
  placeholder: PT.string,
  children: PT.node,
  error: PT.string,
};

export default FormField;
