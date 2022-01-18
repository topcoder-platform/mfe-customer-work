import config from "../../config";
import { CHALLENGE_FIELD_VALUES } from "constants/index";
import { axiosInstance as axios } from "./requestInterceptor";

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
  const body = {
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
 * Get Forum notifications
 * @param {String} challengeId challenge id
 * @param {String} handle member handle
 */
export async function getForumNotifications(challengeId, handle) {
  const response = await fetch(
    `${config.VANILLA_FORUM_API}/groups/${challengeId}/member/${handle}?access_token=${config.VANILLA_ACCESS_TOKEN}`,
    {
      header: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}
