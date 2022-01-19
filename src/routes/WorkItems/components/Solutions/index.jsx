import React from "react";
import PT from "prop-types";
import SolutionList from "./SolutionList";
import SolutionListItem from "./SolutionListItem";
import SolutionNotAvailableYet from "./SolutionsNotAvailableYet";
import IconHint from "../../../../assets/images/icon-hint.svg";

import "./styles.module.scss";

const Solutions = ({
  solutions,
  onDownload,
  isReviewPhaseEnded,
  reviewPhaseEndedDate,
}) => {
  if (isReviewPhaseEnded == null) {
    return null;
  } else if (!isReviewPhaseEnded) {
    return (
      <SolutionNotAvailableYet reviewPhaseEndedDate={reviewPhaseEndedDate} />
    );
  }

  if (solutions.length === 0) {
    return null;
  }

  return (
    <div styleName="solutions">
      <h6 styleName="title">
        THE FOLLOWING SOLUTIONS HAVE MET YOUR DETAILED CRITERIA
        <IconHint styleName="help-icon" />
      </h6>

      <SolutionList>
        {solutions.map((solution) => (
          <SolutionListItem
            solution={solution}
            onDownload={() => onDownload(solution.id)}
          />
        ))}
      </SolutionList>
    </div>
  );
};

Solutions.defaultProps = {};

Solutions.propTypes = {
  solutions: PT.arrayOf(PT.shape()),
  onDownload: PT.func,
  isReviewPhaseEnded: PT.bool,
  reviewPhaseEndedDate: PT.string,
};

export default Solutions;
