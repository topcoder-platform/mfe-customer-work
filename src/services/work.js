import _ from "lodash";
import moment from "moment";
import config from "../../config";
import { axiosInstance as axios } from "./requestInterceptor";
import { WORK_TIMELINE } from "constants";
import workUtil from "utils/work";
import { triggerDownload } from "utils";

export const getWork = async (id) => {
  const challengeId = id;

  const response = await axios.get(
    `${config.API.V5}/challenges/${challengeId}`
  );

  return response.data;
};

export const getSummary = (work) => {
  let timeline = WORK_TIMELINE.map((i) => {
    const date = typeof i.date === "string" ? work[i.date] : i.date(work);
    return {
      name: i.name,
      title: i.title,
      date: date,
      active: typeof i.active === "function" ? i.active(work) : i.active,
      completed:
        typeof i.completed === "function" ? i.completed(work) : i.completed,
      hidden: typeof i.hidden === "function" ? i.hidden(work) : i.hidden,
    };
  });

  // sort by date
  const sendToSolutions = timeline.pop();

  if (!sendToSolutions.hidden) {
    const sorted = [];
    for (let i = 0; i < timeline.length - 1; i += 1) {
      const m = timeline[i];
      if (!m.date) {
        sorted.push(m);
      } else if (
        sendToSolutions.date &&
        moment(m.date).isBefore(sendToSolutions.date)
      ) {
        sorted.push(m);
      } else {
        sorted.push(sendToSolutions);

        const after = timeline
          .slice(i)
          .map((m) => ({ ...m, active: false, completed: false }));

        sorted.push(...after);
        break;
      }
    }
    timeline = sorted;
  }

  // set index
  timeline = timeline.map((i, index) => ({ ...i, index }));

  return {
    status: workUtil.getStatus(work),
    nextAction: workUtil.getNextAction(work),
    daysToBegin: workUtil.getNextActionDaysToBegin(work),

    participants: work.numOfRegistrants,
    solutions: work.numOfSubmissions,
    submitDate: work.created,
    workId: work.id,

    timeline,
  };
};

export const getDetails = (work) => {
  const { metadata } = work || {};

  let formData = {};

  (metadata || []).forEach((item) => {
    if (item.name && item.name.includes(".")) {
      const data = item.name.split(".");
      const key = data[1];
      formData[data[0]] = {
        ...formData[data[0]],
        [key]: JSON.parse(item.value),
      };
    } else {
      if (item.name) {
        formData[item.name] = JSON.parse(item.value);
      }
    }
  });

  return formData;
};

export const getSolutions = async (workId) => {
  const challengeId = workId;
  const response = await axios.get(
    `${config.API.V5}/submissions?challengeId=${challengeId}&orderBy=desc&sortBy=review.score`
  );

  return response.data;
};

export const downloadSolution = async (solutionId) => {
  const submissionId = solutionId;
  const response = await axios({
    url: `${config.API.V5}/submissions/${submissionId}/download`,
    method: "GET",
    responseType: "blob",
  });

  const blob = response.data;
  triggerDownload(`submission-${solutionId}.zip`, blob);
};

export const getMessageCount = () => {};

export const saveSurvey = async (workId, metadata) => {
  const challengeId = workId;
  const body = { metadata };

  const response = await axios.patch(
    `${config.API.V5}/challenges/${challengeId}`,
    JSON.stringify(body)
  );

  return response.data;
};

export default {
  getWork,
  getSummary,
  getDetails,
  getSolutions,
  downloadSolution,
  getMessageCount,
  saveSurvey,
};
