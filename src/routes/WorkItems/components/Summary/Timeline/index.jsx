import React from "react";
import PT from "prop-types";
import TimelineBar from "../TimelineBar";

import "./styles.module.scss";

const Timeline = ({ timeline }) => {
  return (
    <div styleName="timeline">
      <h6 styleName="title">WORK TIMELINE</h6>
      <TimelineBar timeline={timeline} />
    </div>
  );
};

Timeline.defaultProps = {};

Timeline.propTypes = {
  timeline: PT.arrayOf(PT.shape()),
};

export default Timeline;
