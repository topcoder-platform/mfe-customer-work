import config from "../../config";
import { axiosInstance as axios } from "./requestInterceptor";
import { getAuthUserProfile } from "@topcoder/mfe-header";
import _ from "lodash";
import moment from "moment";
import * as websiteDesignUtilsLegacy from "../utils/products/WebDesignLegacy";
import { WorkType } from "../../src-ts";
import {
  formatChallengeCreationBody,
  formatChallengeUpdateBody,
} from "../utils/products";

/**
 * Get Challenge challenge details
 * @param {String} challengeId challenge id
 */
export async function getChallengeDetails(challengeId) {
  const response = await axios.get(
    `${config.API.V5}/challenges/${challengeId}`
  );

  return response?.data;
}

/**
 * Get Intake Form challenge details
 * @param {String} userHandle
 */
export async function getIntakeFormChallenges(userHandle, challengeId) {
  let url = `${config.API.V5}/challenges?createdBy=${userHandle}&selfService=true&status=New`;
  url += challengeId ? `&id=${challengeId}` : "";
  const response = await axios.get(url);

  return response?.data;
}

/**
 * Post a New Challenge
 */
export async function createChallenge(workType) {
  const body =
    workType === WorkType.designLegacy
      ? websiteDesignUtilsLegacy.formatChallengeCreationBody()
      : formatChallengeCreationBody(workType);

  const response = await axios.post(
    `${config.API.V5}/challenges`,
    JSON.stringify(body)
  );

  return response?.data;
}

/**
 * Patch a New Challenge
 */
export async function patchChallenge(intakeForm, challengeId) {
  const jsonData = JSON.parse(intakeForm);
  const workType = _.get(jsonData, "form.workType.selectedWorkType");
  const body =
    workType === WorkType.designLegacy
      ? websiteDesignUtilsLegacy.formatChallengeUpdateBodyLegacy(intakeForm)
      : formatChallengeUpdateBody(intakeForm, workType);

  const response = await axios.patch(
    `${config.API.V5}/challenges/${challengeId}`,
    JSON.stringify(body)
  );

  return response?.data;
}

/**
 * Patch a New Challenge
 */
export async function activateChallenge(challengeId) {
  const challenge = await getChallengeDetails(challengeId);
  const newDiscussions = [...(challenge.discussions || [])];
  if (newDiscussions.length > 0) {
    newDiscussions[0].name = challenge.name;
  } else {
    newDiscussions.push({
      name: challenge.name,
      type: "challenge",
      provider: "vanilla",
    });
  }

  let daysToAdd;
  switch (moment(new Date()).weekday()) {
    case moment().day("Friday").weekday():
      daysToAdd = 3;
      break;
    case moment().day("Saturday").weekday():
      daysToAdd = 2;
      break;
    case moment().day("Sunday").weekday():
      daysToAdd = 1;
      break;
    default:
      daysToAdd = 1;
  }

  const body = {
    status: "Draft",
    discussions: [...newDiscussions],
    startDate: moment().add(daysToAdd, "days").format(),
  };
  const response = await axios.patch(
    `${config.API.V5}/challenges/${challengeId}`,
    JSON.stringify(body)
  );

  return response?.data;
}

/**
 * Get Forum notifications
 * @param {String} challengeId challenge id
 */
export async function getForumNotifications(challengeId) {
  const profile = await getAuthUserProfile();
  const response = await fetch(
    `${config.VANILLA_FORUM_API}/groups/${challengeId}/member/${profile.handle}?access_token=${config.VANILLA_ACCESS_TOKEN}`,
    {
      header: {
        "Content-Type": "application/json",
      },
    }
  );

  const res = await response.json();
  return {
    ...res,
    challengeId,
  };
}

export default {
  getChallengeDetails,
  getIntakeFormChallenges,
  createChallenge,
  patchChallenge,
  getForumNotifications,
};
