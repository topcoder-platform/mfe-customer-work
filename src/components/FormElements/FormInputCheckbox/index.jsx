/**
 * FormInputCheckbox
 *
 * Form Input Checkbox
 */
import cn from "classnames";
import PT from "prop-types";
import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";
import React from "react";
import styles from "./styles.module.scss";

const FormInputCheckbox = ({
  label,
  onChange = (f) => f,
  styleName,
  ...props
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label styleName={cn("styles.form-input-checkbox", styleName || "")}>
      <Checkbox
        className={"form-input-rc-checkbox"}
        onChange={onChange}
        {...props}
      />
      <span
        styleName="styles.label"
        dangerouslySetInnerHTML={{ __html: label }}
      ></span>
    </label>
  );
};

FormInputCheckbox.propTypes = {
  label: PT.string,
};

export default FormInputCheckbox;
