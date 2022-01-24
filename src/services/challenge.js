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
  // TODO: Move this into a service/util. Currently hardcoded for website design
  const intakeMetadata = [];

  intakeMetadata.push({
    name: "websitePurpose.description",
    value: _.get(jsonData, "form.websitePurpose.description.value"),
  });

  intakeMetadata.push({
    name: "basicInfo.selectedPageOption",
    value: _.get(
      jsonData,
      "form.basicInfo.selectedPageOption.option",
      ""
    ).split("(")[0],
  });

  intakeMetadata.push({
    name: "basicInfo.numberOfDevices",
    value: _.get(jsonData, "form.basicInfo.selectedDeviceNumber.value", 1),
  });

  intakeMetadata.push({
    name: "basicInfo.supportedDevices",
    value: _.get(jsonData, "form.basicInfo.selectedDevice.option"),
  });

  intakeMetadata.push({
    name: "websitePurpose.industry",
    value: _.get(jsonData, "form.websitePurpose.industry.value.value"),
  });

  intakeMetadata.push({
    name: "websitePurpose.userStory",
    value: _.get(jsonData, "form.websitePurpose.userStory.value"),
  });

  intakeMetadata.push({
    name: "pageDetails",
    value: _.map(
      _.get(jsonData, "form.pageDetails.pages", []),
      (p) => `### ${p.pageName}\n\n${p.pageDetails}`
    ).join("\n\n"),
  });

  intakeMetadata.push({
    name: "branding.theme",
    value: _.get(jsonData, "form.branding.theme.value"),
  });

  intakeMetadata.push({
    name: "branding.websitesForInspiration",
    value: _.get(jsonData, "form.branding.website.value"), // TODO: This is not correct
  });

  intakeMetadata.push({
    name: "branding.colorOption",
    value: _.get(jsonData, "form.branding.colorOption.option"),
  });

  intakeMetadata.push({
    name: "branding.specificColor",
    value: _.get(jsonData, "form.branding.specificColor.value"),
  });

  intakeMetadata.push({
    name: "branding.fontOption",
    value: _.get(jsonData, "form.branding.fontOption.option"),
  });

  intakeMetadata.push({
    name: "branding.fontFiles",
    value: "N/A", // TODO: This is not correct
  });

  intakeMetadata.push({
    name: "branding.stockPhotos",
    value: _.get(jsonData, "form.branding.design.option"), // TODO: Rename to stockPhotos
  });

  intakeMetadata.push({
    name: "branding.selectedDeliverableOption",
    value: _.get(jsonData, "form.branding.selectedDeliverableOption.option"),
  });

  const body = {
    ...(name ? { name } : {}),
    metadata: [
      ..._.map(
        _.filter(intakeMetadata, (e) => !_.isEmpty(e.value)),
        (e) => ({ ...e, value: _.toString(e.value) })
      ),
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
  const challenge = await getChallengeDetails(challengeId)
  const body = {
    status: "Draft",
    discussions: [
      {
        name: challenge.name,
        type: "challenge",
        provider: "vanilla"
      }
    ]
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
