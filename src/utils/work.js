import { WORK_STATUSES } from "constants";
import _ from "lodash";
import moment from "moment";

export const getStatus = (work) => {
  const workStatus = _.find(WORK_STATUSES, { value: work.status });
  return workStatus ? workStatus.name : work.status;
};

export const getNextAction = (work) => {
  if (work.status === "New") {
    return "Submit work";
  } else if (work.status === "Draft" || work.status === "Active") {
    return "Accept";
  }
  return "";
};

/**
 * @internal
 */
const getCurrentPhase = (work) => {
  const status = work.status;
  let currentPhase;

  if (status === "Active") {
    currentPhase = work.currentPhase
      ? work.currentPhase
      : work.phases.filter((phase) => phase.isOpen).pop();
  }

  return currentPhase;
};

export const getNextActionDaysToBegin = (work) => {
  const currentPhase = getCurrentPhase(work);
  if (!currentPhase) {
    return;
  }

  const endDate = moment(currentPhase.scheduledEndDate);
  const now = moment();
  return endDate.diff(now, "days");
};

export const isReviewPhaseEnded = (work) => {
  const allPhases = work.phases || [];

  let isReviewPhaseComplete = false;
  _.forEach(allPhases, (phase) => {
    if (
      phase.name === "Review" &&
      !phase.isOpen &&
      moment(phase.scheduledStartDate).isBefore()
    ) {
      isReviewPhaseComplete = true;
    }
  });

  return isReviewPhaseComplete;
};

export const getReviewPhaseEndedDate = (work) => {
  const allPhases = work.phases || [];
  let phase = _.find(allPhases, { name: "Review" });

  if (isReviewPhaseEnded(work)) {
    return phase.actualEndDate;
  }

  if (!phase) {
    console.error("ERROR: Work type is First2Finish");
    phase = _.find(allPhases, { name: "Iterative Review" });
  }

  return phase.scheduledEndDate;
};

export const phaseEndDate = (phase) => {
  if (phase.isOpen || moment(phase.scheduledStartDate).isAfter()) {
    return phase.scheduledEndDate;
  }

  return phase.actualEndDate || phase.scheduledEndDate;
};

export const phaseStartDate = (phase) => {
  if (phase.isOpen !== true && moment(phase.scheduledStartDate).isAfter()) {
    return phase.scheduledStartDate;
  }

  return phase.actualStartDate;
};

export default {
  getStatus,
  getNextAction,
  getNextActionDaysToBegin,
  isReviewPhaseEnded,
  getReviewPhaseEndedDate,
  phaseEndDate,
  phaseStartDate,
};
