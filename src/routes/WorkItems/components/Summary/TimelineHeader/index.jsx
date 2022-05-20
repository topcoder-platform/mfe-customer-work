import React from "react";
import PT from "prop-types";
import { WORK_STATUSES, WORK_TIMELINE } from "constants";
import _ from "lodash";
import { padStart } from "utils";

import "./styles.module.scss";

const TimelineHeader = ({ status, daysToBegin }) => {
  let item = _.find(WORK_TIMELINE, { title: status });
  if (!item) item = _.find(WORK_STATUSES, { name: status });
  const color = item ? item.color : "#555555";

  let str = status;
  if (
    status === WORK_STATUSES.DirectedToSales.name ||
    status === WORK_STATUSES.Cancelled.name ||
    status === WORK_STATUSES.PaymentFailed.name
  ) {
    str = "redirected";
  }

  let daysStr;
  if (daysToBegin === 0) daysStr = "DUE NOW";
  else if (daysToBegin === 1) daysStr = `${padStart(daysToBegin)} DAY`;
  else if (daysToBegin > 1) daysStr = `${padStart(daysToBegin)} DAYS`;
  else if (daysToBegin === -1)
    daysStr = `LATE BY ${padStart(-daysToBegin)} DAY`;
  else if (daysToBegin < -1) daysStr = `LATE BY ${padStart(-daysToBegin)} DAYS`;

  return (
    <div styleName="timeline-header">
      <span styleName="work-status" style={{ backgroundColor: color }}>
        {str}
      </span>
    </div>
  );
};

TimelineHeader.defaultProps = {};

TimelineHeader.propTypes = {
  status: PT.string,
  daysToBegin: PT.number,
};

export default TimelineHeader;