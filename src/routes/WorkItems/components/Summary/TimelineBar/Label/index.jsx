import React from "react";
import PT from "prop-types";
import moment from "moment";

import "./styles.module.scss";

const Label = ({ step, alignment, highlight }) => {
  const { title, date } = step;

  return (
    <div styleName={`label ${alignment} ${highlight ? "highlight" : ""}`}>
      <strong>{title}</strong>
      <br />
      {date ? moment(date).format("MM/DD/YY") : "TBD"}
    </div>
  );
};

Label.defaultProps = {};

Label.propTypes = {
  step: PT.shape(),
  alignment: PT.string,
  highlight: PT.bool,
};

export default Label;
