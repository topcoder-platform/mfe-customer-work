import { CHALLENGE_FIELD_VALUES } from "constants/index";
import config from "../../config";
import { axiosInstance as axios } from "./requestInterceptor";
import templateData from "../assets/data/spec-templates/website-design.json";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import _ from "lodash";

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
  let url = `${config.API.V5}/challenges?createdBy=${userHandle}&selfService=true`;
  url += challengeId ? `&id=${challengeId}` : "";
  const response = await axios.get(url);

  return response?.data;
}

/**
 * Post a New Challenge
 */
export async function createChallenge() {
  const body = {
    typeId: CHALLENGE_FIELD_VALUES.typeId,
    trackId: CHALLENGE_FIELD_VALUES.trackId,
    timelineTemplateId: CHALLENGE_FIELD_VALUES.timelineTemplateId,
    name: "new-self-service-project",
    ...templateData,
    legacy: {
      selfService: true,
    },
  };
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
  const name = _.get(jsonData, "form.basicInfo.projectTitle.value");
  const body = {
    ...(name ? { name } : {}),
    metadata: [
      {
        name: "intake-form",
        value: intakeForm,
      },
    ],
  };
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
  const body = {
    status: "Draft",
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

  return response.json();
}

export default {
  getChallengeDetails,
  getIntakeFormChallenges,
  createChallenge,
  patchChallenge,
  getForumNotifications,
};
