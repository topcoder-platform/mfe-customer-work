import React from "react";
import PT from "prop-types";
import { WORK_STATUSES } from "constants";
import _ from "lodash";
import "./styles.module.scss";

const TimelineHeader = ({ status, nextAction, daysToBegin }) => {
  const item = _.find(WORK_STATUSES, { name: status });
  const color = item ? item.color : undefined;

  let str = status;
  if (status === WORK_STATUSES.DirectedToSales.name) {
    str = "SENT TO SOLUTIONS EXPERT";
  }

  return (
    <div styleName="timeline-header">
      <span styleName="work-status" style={{ backgroundColor: color }}>
        {str}
      </span>
      {nextAction && (
        <span styleName="next-action">
          NEXT ACTION - {nextAction}
          {daysToBegin && ": "}
          {daysToBegin && <strong>{daysToBegin} DAYS</strong>}
        </span>
      )}
    </div>
  );
};

TimelineHeader.defaultProps = {};

TimelineHeader.propTypes = {
  status: PT.string,
  nextAction: PT.string,
  daysToBegin: PT.number,
};

export default TimelineHeader;
