/**
 * ReactSelect
 *
 * A wrapper of react select control.
 */
import React from "react";
import PT from "prop-types";
import Select from "react-select";
import "./styles.module.scss";

// TODO: figure out why this export is needed
// https://github.com/topcoder-platform/mfe-customer-work/issues/74
export const ReactSelect = (props) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px",
      border: props.style2 ? "0" : "1px solid #aaaaab",
      borderColor: state.isFocused ? "#55a5ff" : "#aaaaab",
      boxShadow: props.style2
        ? "none"
        : state.isFocused
        ? "0 0 2px 1px #cee6ff"
        : provided.boxShadow,
    }),
    menu: (provided) => ({
      ...provided,
      minHeight: "40px",
      zIndex: 10,
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 6px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
      height: "auto",
      padding: "0",
      fontSize: props.style2 ? "20px" : "14px",
      paddingLeft: props.style2 ? "8px" : "0",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "auto",
      marginTop: "-5px",
    }),
    option: (provided) => ({
      ...provided,
      minHeight: "32px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#AAAAAA",
      fontFamily: "Roboto",
      fontSize: props.style2 ? "20px" : "14px",
      lineHeight: "22px",
      textAlign: "left",
      fontWeight: "400",
      paddingLeft: props.style2 ? "5px" : "0",
      marginTop: props.style2 ? "-5px" : "0",
    }),
    singleValue: (provided) => ({
      paddingLeft: props.style2 ? "5px" : "",
      marginTop: props.style2 ? "-5px" : "",
      fontSize: props.style2 ? "20px" : "",
      lineHeight: "24px",
      ...provided,
    }),
    multiValue: (provided) => ({
      ...provided,
      margin: "3px 3px",
      color: "#AAAAAA",
      fontFamily: "Roboto",
      fontSize: "14px",
      lineHeight: "22px",
      textAlign: "left",
      borderRadius: "5px",
    }),
  };

  return (
    <div styleName="select-wrapper">
      <Select
        value={props.value}
        styles={customStyles}
        onChange={props.onChange}
        options={props.options}
        styleName={props.error ? "error" : ""}
        isMulti={props.isMulti}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        onInputChange={props.onInputChange}
        noOptionsMessage={() => props.noOptionsText}
        isDisabled={props.disabled}
      />
    </div>
  );
};

ReactSelect.propTypes = {
  value: PT.string.isRequired,
  onChange: PT.func.isRequired,
  placeholder: PT.string,
  error: PT.string,
  isMulti: PT.bool,
  onBlur: PT.func,
  onFocus: PT.func,
  onInputChange: PT.func,
  options: PT.arrayOf(
    PT.shape({
      value: PT.string.isRequired,
      label: PT.string.isRequired,
    }).isRequired
  ),
  noOptionsText: PT.string,
  disabled: PT.bool,
  style2: PT.bool,
};

export default ReactSelect;
