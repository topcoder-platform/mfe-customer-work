import React from "react";
import PT from "prop-types";
import moment from "moment";
import TimelineHeader from "./TimelineHeader";
import Timeline from "./Timeline";

import "./styles.module.scss";

const Summary = ({ summary }) => {
  return (
    <div>
      <div styleName="float-right">
        <ul styleName="work-summary listbox" role="listbox">
          <li styleName="work-summaryItem">
            PARTICIPANTS: {summary.participants}
          </li>
          <li styleName="divider" />
          <li styleName="work-summaryItem">SOLUTIONS: {summary.solutions}</li>
          <li styleName="divider" />
          <li styleName="work-summaryItem">
            SUBMIT DATE: {moment(summary.submitDate).format("MM/DD/YY")}
          </li>
          <li styleName="divider" />
          <li styleName="work-summaryItem work-id">
            WORK ID: {summary.workId}
          </li>
        </ul>
      </div>
      <div styleName="work-timeline">
        <TimelineHeader
          status={summary.status}
          nextAction={summary.nextAction}
          daysToBegin={summary.daysToBegin}
        />
        <Timeline timeline={summary.timeline} />
      </div>
    </div>
  );
};

Summary.defaultProps = {};

Summary.propTypes = {
  summary: PT.shape({
    participants: PT.number,
    solutions: PT.number,
    submitDate: PT.string,
    workId: PT.string,
    status: PT.string,
    nextAction: PT.string,
    daysToBegin: PT.number,
    timeline: PT.arrayOf(PT.shape()),
  }),
};

export default Summary;
