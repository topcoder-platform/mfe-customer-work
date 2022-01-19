import React from "react";
import PT from "prop-types";
import moment from "moment";
import TimelineHeader from "./TimelineHeader";
import Timeline from "./Timeline";

import "./styles.module.scss";

export const TimelineContext = React.createContext();

const Summary = ({ summary, onTabChange }) => {
  const {
    participants,
    solutions,
    submitDate,
    workId,
    status,
    nextAction,
    daysToBegin,
    timeline,
  } = summary;

  return (
    <div>
      <div styleName="float-right">
        <ul styleName="work-summary listbox" role="listbox">
          <li styleName="work-summaryItem">PARTICIPANTS: {participants}</li>
          <li styleName="divider" />
          <li styleName="work-summaryItem">SOLUTIONS: {solutions}</li>
          <li styleName="divider" />
          <li styleName="work-summaryItem">
            SUBMIT DATE: {moment(submitDate).format("MM/DD/YY")}
          </li>
          <li styleName="divider" />
          <li styleName="work-summaryItem work-id">WORK ID: {workId}</li>
        </ul>
      </div>
      <div styleName="work-timeline">
        <TimelineHeader
          status={status}
          nextAction={nextAction}
          daysToBegin={daysToBegin}
        />
        <TimelineContext.Provider value={{ workId, onTabChange }}>
          <Timeline timeline={timeline} />
        </TimelineContext.Provider>
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
  onTabChange: PT.func,
};

export default Summary;
