import React from "react";
import PT from "prop-types";
import moment from "moment";
import TimelineHeader from "./TimelineHeader";
import _ from "lodash";
import Timeline from "./Timeline";

import "./styles.module.scss";
import PageP from "components/PageElements/PageP";

export const TimelineContext = React.createContext();

const Summary = ({ summary, setSelectedTab, setShowSurvey }) => {
  const {
    participants,
    solutions,
    submitDate,
    workId,
    status,
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
            SUBMIT DATE: {moment(submitDate).format("MM/DD/YYYY")}
          </li>
          <li styleName="divider" />
          <li styleName="work-summaryItem work-id">WORK ID: {workId}</li>
        </ul>
      </div>
      <div styleName="work-timeline">
        <TimelineHeader status={status} daysToBegin={daysToBegin} />
        <TimelineContext.Provider
          value={{ workId, setSelectedTab, setShowSurvey }}
        >
          {_.toLower(status) === "redirected" ? (
            <div styleName="redirected-text">
              <PageP>
                We have a few outstanding questions that will help us better
                understand the work and scope before we can launch your work on
                our platform.
              </PageP>
              <PageP>
                A Topcoder Solutions Expert will reach out to you about your
                work request.
              </PageP>
              <PageP>
                <strong>
                  Please note, the charge to your credit card has been put on
                  hold automatically for you.
                </strong>
              </PageP>
              <PageP>
                Thank you!
                <br />
                The Topcoder Team
              </PageP>
            </div>
          ) : _.toLower(status) === "deleted" ? (
            <div styleName="redirected-text">
              <PageP>This work item has been deleted.</PageP>
            </div>
          ) : (
            <Timeline timeline={timeline} />
          )}
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
    daysToBegin: PT.number,
    timeline: PT.arrayOf(PT.shape()),
  }),
  setSelectedTab: PT.func,
  setShowSurvey: PT.func,
};

export default Summary;
