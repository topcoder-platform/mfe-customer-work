import React from "react";
import PT from "prop-types";
import moment from "moment";
import { Link } from "@reach/router";

import "./styles.module.scss";

import { TimelineContext } from "../../../Summary";

const Label = ({ step, alignment, highlight }) => {
  const { title, date } = step;

  return (
    <TimelineContext.Consumer>
      {({ workId, onTabChange }) => (
        <div styleName={`label ${alignment} ${highlight ? "highlight" : ""}`}>
          <strong>{title}</strong>
          <br />
          {date ? moment(date).format("MM/DD/YY") : "TBD"}

          {step.name === "downloads-ready" && (
            <Link
              to={`/self-service/work-items/${workId}?tab=solutions`}
              styleName="link"
              onClick={(event) => {
                event.preventDefault();
                onTabChange("solutions");
              }}
            />
          )}
        </div>
      )}
    </TimelineContext.Consumer>
  );
};

Label.defaultProps = {};

Label.propTypes = {
  step: PT.shape(),
  alignment: PT.string,
  highlight: PT.bool,
};

export default Label;
