import React from "react";
import PT from "prop-types";
import moment from "moment";
import "./styles.module.scss";

const SolutionsNotAvailableYet = ({ reviewPhaseEndedDate }) => {
  return (
    <p styleName="solutions-not-available">
      YOUR SOLUTIONS WILL BE AVAILABLE FOR DOWNLOAD ON:
      <br />
      {reviewPhaseEndedDate && moment(reviewPhaseEndedDate).format("MM/DD/YY")}
    </p>
  );
};

SolutionsNotAvailableYet.defaultProps = {};

SolutionsNotAvailableYet.propTypes = {
  reviewPhaseEndedDate: PT.string,
};

export default SolutionsNotAvailableYet;
