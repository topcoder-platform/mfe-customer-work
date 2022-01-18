/**
 * Onboard Progress
 *
 * Onboard Progress (level) Indicator
 */
import cn from "classnames";
import ProgressDonutChart from "components/ProgressDonutChart";
import ProgressPopup from "components/ProgressPopup";
import { MAX_COMPLETED_STEP, ProgressLevels as levels } from "constants";
import _ from "lodash";
import PT from "prop-types";
import React, { useState } from "react";
import config from "../../../config";
import IconThreeDots from "../../assets/images/icon-three-dots-vertical.svg";
import { getCookie, setCookie } from "../../autoSaveBeforeLogin";
import "./styles.module.scss";

const Progress = ({ level, styleName, ...props }) => {
  const [progressPopupOpen, setProgressPopupOpen] = useState(false);
  const maxCompletedStep = getCookie(MAX_COMPLETED_STEP) || 0;
  if (
    _.isUndefined(maxCompletedStep) ||
    _.isNull(maxCompletedStep) ||
    parseInt(maxCompletedStep) < level
  ) {
    setCookie(MAX_COMPLETED_STEP, level, config.AUTO_SAVED_COOKIE_EXPIRED_IN);
  }

  return (
    <div styleName={cn("onboard-progress", styleName || "")} {...props}>
      <div styleName="level-container">
        <div styleName="level">
          <span styleName="level-num">STEP {level} </span>
          <span styleName="muted">/ {levels.length}</span>
        </div>
        <div>{levels[level - 1].label}</div>
      </div>
      <ProgressDonutChart
        styleName="progress-donut-chart"
        progress={100 * (level / levels.length)}
      />
      <div
        styleName="progress-popup-toggle"
        onClick={(e) => setProgressPopupOpen((o) => !o)}
        role="tab"
        tabIndex={0}
      >
        <IconThreeDots />
      </div>
      <ProgressPopup
        level={level}
        maxStep={maxCompletedStep}
        levels={levels}
        open={progressPopupOpen}
        handleClose={(e) => setProgressPopupOpen(false)}
      />
    </div>
  );
};

Progress.propTypes = {
  level: PT.number,
};

export default Progress;
