/**
 * Onboard Progress
 *
 * Onboard Progress (level) Indicator
 */
import _ from "lodash";
import PT from "prop-types";
import React, { useState } from "react";
import cn from "classnames";
import ProgressDonutChart from "components/ProgressDonutChart";
import ProgressPopup from "components/ProgressPopup";
import config from "../../../config";
import { MAX_COMPLETED_STEP } from "constants";
import { PROGRESS_LEVELS as originalLevels } from "../../constants/products/WebsiteDesignLegacy";
import { setCookie, getCookie } from "../../autoSaveBeforeLogin";
import IconThreeDots from "../../assets/images/icon-three-dots-vertical.svg";
import "./styles.module.scss";

const Progress = ({ level, styleName, setStep, ...props }) => {
  const [progressPopupOpen, setProgressPopupOpen] = useState(false);
  let maxCompletedStep = getCookie(MAX_COMPLETED_STEP) || 0;
  if (
    _.isUndefined(maxCompletedStep) ||
    _.isNull(maxCompletedStep) ||
    parseInt(maxCompletedStep) < level
  ) {
    setCookie(MAX_COMPLETED_STEP, level, config.AUTO_SAVED_COOKIE_EXPIRED_IN);
    maxCompletedStep = level;
  }

  const levels = _.filter(originalLevels, (l) => l.visibleInProgressIndicator);

  const trueLevel = _.find(levels, (l) => l.trueIndex === level);

  return (
    <div styleName={cn("onboard-progress", styleName || "")} {...props}>
      <div styleName="level-container">
        <div styleName="level">
          <span styleName="level-num">STEP {trueLevel.showIndex} </span>
          <span styleName="muted">/ {levels.length}</span>
        </div>
        <div>{trueLevel.label}</div>
      </div>
      <ProgressDonutChart
        styleName="progress-donut-chart"
        progress={100 * (trueLevel.showIndex / levels.length)}
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
        setStep={setStep}
        level={trueLevel.trueIndex}
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
