import React from "react";
import PT from "prop-types";
import { WORK_TIMELINE } from "constants";
import "./styles.module.scss";

const Track = ({ children, step }) => {
  const { active, completed, index, name, isFirst } = step;
  const color = completed ? "completed" : active ? "active" : "";
  const width =
    name === "send-to-solutions-expert"
      ? `${(100 / (WORK_TIMELINE.length - 2)) * (index - 1 + 0.5)}%`
      : undefined;
  const position = name === "send-to-solutions-expert" ? "absolute" : undefined;

  return (
    <div
      styleName={`track ${isFirst ? "isFirst" : ""} ${color} ${name || ""}`}
      hidden={step.hidden}
      style={{ width, position }}
    >
      <div styleName="container">{children}</div>
    </div>
  );
};

Track.defaultProps = {};

Track.propTypes = {
  children: PT.node,
  step: PT.shape(),
};

export default Track;
