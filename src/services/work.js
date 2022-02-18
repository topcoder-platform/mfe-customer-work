import _ from "lodash";
import moment from "moment";
import config from "../../config";
import { axiosInstance as axios } from "./requestInterceptor";
import { WORK_TIMELINE, CHALLENGE_STATUS, WORK_STATUSES } from "constants";
import workUtil from "utils/work";
import { triggerDownload } from "utils";

export const getWork = async (id) => {
  const challengeId = id;

  const response = await axios.get(
    `${config.API.V5}/challenges/${challengeId}`
  );

  const data = response.data;
  if (data.status.startsWith("Cancelled")) {
    data.status = CHALLENGE_STATUS.CANCELLED;
  }

  return data;
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
    let sorted = [];
    let sendToSolutionsInserted = false;
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
        sendToSolutionsInserted = true;
        sorted.push(sendToSolutions);

        const after = timeline
          .slice(i)
          .map((m) => ({ ...m, active: false, completed: false }));

        sorted.push(...after);
        break;
      }
    }
    if (!sendToSolutionsInserted) {
      sorted.push(sendToSolutions);
    }
    timeline = sorted;
  }

  // set index
  timeline = timeline.map((m, index) => ({
    ...m,
    index,
    isFirst: index === 0,
    isLast:
      index === timeline.length - 1 - timeline.filter((i) => i.hidden).length,
  }));

  let status = _.get(
    _.findLast(timeline, "completed"),
    "title",
    workUtil.getStatus(work)
  );

  if (
    status === WORK_STATUSES.DirectedToSales.name ||
    status === WORK_STATUSES.PaymentFailed.name
  ) {
    status = "Redirected";
  }

  return {
    status,
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

  // TODO: Fix this
  const filtered = _.filter(metadata, (m) => m.name === "intake-form");
  (filtered || []).forEach((item) => {
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
    `${config.API.V5}/submissions?challengeId=${challengeId}&orderBy=desc&sortBy=review.score&perPage=5`
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
  saveSurvey,
};
