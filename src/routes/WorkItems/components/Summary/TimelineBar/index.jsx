import React from "react";
import PT from "prop-types";
import Bar from "./Bar";
import Track from "./Track";
import Point from "./Point";
import Label from "./Label";

import "./styles.module.scss";

const TimelineBar = ({ timeline }) => {
  const timelineLength = React.useMemo(
    () => timeline.filter((i) => !i.hidden).length,
    [timeline]
  );
  const m = timeline.find((i) => i.name === "downloads-ready");
  const downloadsReady = m.active || m.completed;

  return (
    <div styleName="timeline-bar">
      <Bar />
      {timeline.map((step) => (
        <Track step={step}>
          <Point step={step} />
          <Label
            step={step}
            alignment={
              step.index === 0
                ? "left"
                : step.index === timelineLength - 1
                ? "right"
                : ""
            }
            highlight={downloadsReady && step.index >= m.index}
          />
        </Track>
      ))}
    </div>
  );
};

TimelineBar.defaultProps = {};

TimelineBar.propTypes = {
  timeline: PT.arrayOf(
    PT.shape({
      name: PT.string,
      title: PT.string,
      date: PT.string,
      active: PT.bool,
      completed: PT.bool,
      hidden: PT.bool,
    })
  ),
};

export default TimelineBar;
