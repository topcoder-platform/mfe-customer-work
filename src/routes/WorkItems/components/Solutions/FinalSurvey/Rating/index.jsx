import React from "react";
import PT from "prop-types";
import Button from "components/Button";
import { BUTTON_TYPE } from "constants";
import IconStar from "../../../../../../assets/images/icon-star.svg";

import "./styles.module.scss";

const Rating = ({ max, value, onChange }) => {
  const stars = [];

  for (let i = 1; i <= max; i += 1) {
    if (i <= value) {
      stars.push(
        <Button
          type={BUTTON_TYPE.ROUNDED}
          styleName="star-btn"
          onClick={() => onChange(i)}
        >
          <IconStar styleName="rated" />
        </Button>
      );
    } else {
      stars.push(
        <Button
          type={BUTTON_TYPE.ROUNDED}
          styleName="star-btn"
          onClick={() => onChange(i)}
        >
          <IconStar />
        </Button>
      );
    }
  }

  return <div styleName="rating">{stars}</div>;
};

Rating.defaultProps = {
  max: 10,
  value: 10,
};

Rating.propTypes = {
  max: PT.number,
  value: PT.number,
  onChange: PT.func,
};

export default Rating;
