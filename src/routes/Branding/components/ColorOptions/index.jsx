/**
 * Color Options component
 */
import classNames from "classnames";
import PT from "prop-types";
import React from "react";
import { v4 as uuidV4 } from "uuid";
import CheckIcon from "../../../../assets/images/check.svg";
import "./styles.module.scss";

const ColorOptions = ({ colors, selectedColor, onSelect }) => {
  return (
    <div styleName="colorOptions">
      {colors.map((color, index) => (
        <div
          styleName="colorWrapper"
          key={uuidV4}
          role="button"
          tabIndex={0}
          onClick={() => onSelect(index, color.name)}
        >
          <div
            styleName={classNames(
              "color",
              color.className,
              selectedColor === index ? "selected" : null
            )}
          >
            <CheckIcon />
          </div>
          <div styleName="colorName">{color.name}</div>
        </div>
      ))}
    </div>
  );
};

ColorOptions.defaultProps = {
  colors: [],
};

ColorOptions.propTypes = {
  colors: PT.arrayOf(PT.shape()),
  selectedColor: PT.number,
  onSelect: PT.func,
};

export default ColorOptions;
