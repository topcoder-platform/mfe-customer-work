import React from "react";
import PT from "prop-types";
import SolutionList from "./SolutionList";
import SolutionListItem from "./SolutionListItem";
import SolutionNotAvailableYet from "./SolutionsNotAvailableYet";

import "./styles.module.scss";
import { WORK_STATUSES } from "constants/";

const Solutions = ({
  solutions,
  onDownload,
  isReviewPhaseEnded,
  reviewPhaseEndedDate,
  work,
}) => {
  if (work && work.status === WORK_STATUSES.DirectedToSales.value) {
    return null;
  }

  if (isReviewPhaseEnded == null) {
    return null;
  } else if (!isReviewPhaseEnded) {
    return (
      <SolutionNotAvailableYet reviewPhaseEndedDate={reviewPhaseEndedDate} />
    );
  }

  if (!solutions || solutions.length === 0) {
    return null;
  }

  return (
    <div styleName="solutions">
      <div styleName="header">
        <h6 styleName="title">
          Solutions Available for Download
        </h6>
        <p>
          The solutions listed below have met your detailed criteria. They are ranked based on the best solution as determined by Topcoder expert reviewers.
        </p>
      </div>

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
  work: PT.shape(),
};

export default Solutions;
