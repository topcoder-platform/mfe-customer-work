import React from "react";
import PT from "prop-types";
import moment from "moment";
import { Link } from "@reach/router";
import { TimelineContext } from "../../../Summary";

import "./styles.module.scss";

const Label = ({ step, alignment }) => {
  const { title, date } = step;
  const downloadsReady =
    step.name === "downloads-ready" && (step.active || step.completed);
  const markAsDone = step.name === "mark-as-done" && step.active;
  const isLink = downloadsReady || markAsDone;
  const content = (
    <>
      <strong>{title}</strong>
      <br />
      {date ? moment(date).format("MM/DD/YYYY") : "TBD"}
    </>
  );
  const styleName = `label ${alignment} ${isLink ? "highlight" : ""}`;

  return (
    <TimelineContext.Consumer>
      {({ workId, setSelectedTab, setShowSurvey }) => {
        if (downloadsReady) {
          return (
            <Link
              to={`/self-service/work-items/${workId}?tab=solutions`}
              styleName={styleName}
              onClick={(event) => {
                event.preventDefault();
                setSelectedTab("solutions");
              }}
            >
              {content}
            </Link>
          );
        }

        if (markAsDone) {
          return (
            <a
              href="#void"
              styleName={styleName}
              onClick={(event) => {
                event.preventDefault();
                setShowSurvey(true);
              }}
            >
              {content}
            </a>
          );
        }

        return (
          <div styleName={`label ${alignment} ${isLink ? "highlight" : ""}`}>
            {content}
          </div>
        );
      }}
    </TimelineContext.Consumer>
  );
};

Label.defaultProps = {};

Label.propTypes = {
  step: PT.shape(),
  alignment: PT.string,
};

export default Label;
