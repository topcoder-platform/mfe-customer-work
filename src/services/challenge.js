import { CHALLENGE_FIELD_VALUES, DEVICE_TYPE_DETAILS } from "constants/index";
import config from "../../config";
import { axiosInstance as axios } from "./requestInterceptor";
import templateData from "../assets/data/spec-templates/website-design.json";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import _ from "lodash";
import moment from "moment";
import { getDynamicPriceAndTimeline } from "utils/";
import { DEFAULT_TIMELINE } from "constants/";

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
    tags: ["Website Design"],
    discussions: [
      {
        name: "new-self-service-project",
        type: "challenge",
        provider: "vanilla",
      },
    ],
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

  const numOfPages = _.get(jsonData, "form.pageDetails.pages.length", 1);
  const numOfDevices = _.get(
    jsonData,
    "form.basicInfo.selectedDevice.option.length",
    1
  );

  intakeMetadata.push({
    name: "websitePurpose.description",
    value: _.get(jsonData, "form.websitePurpose.description.value"),
  });

  intakeMetadata.push({
    name: "basicInfo.numberOfPages",
    value: numOfPages === 1 ? "1 Screen" : `${numOfPages} Screens`,
  });

  intakeMetadata.push({
    name: "basicInfo.numberOfDevices",
    value: numOfDevices === 1 ? "1 Device" : `${numOfDevices} Devices`,
  });

  intakeMetadata.push({
    name: "basicInfo.supportedDevices",
    value: _.map(
      _.get(jsonData, "form.basicInfo.selectedDevice.option", []),
      (device) => `- **${device}**: ${DEVICE_TYPE_DETAILS[_.toLower(device)]}`
    ).join(" \n\n "),
  });

  intakeMetadata.push({
    name: "websitePurpose.industry",
    value: _.get(jsonData, "form.websitePurpose.industry.value.label"),
  });

  intakeMetadata.push({
    name: "websitePurpose.userStory",
    value: _.get(jsonData, "form.websitePurpose.userStory.value"),
  });

  intakeMetadata.push({
    name: "websitePurpose.existingWebsite",
    value: _.get(jsonData, "form.websitePurpose.existingWebsite.value", "None"),
  });

  intakeMetadata.push({
    name: "websitePurpose.existingWebsiteInfo",
    value: _.get(
      jsonData,
      "form.websitePurpose.existingWebsiteInfo.value",
      "None"
    ),
  });

  intakeMetadata.push({
    name: "pageDetails",
    value: _.map(
      _.get(jsonData, "form.pageDetails.pages", []),
      (p, i) =>
        `### PAGE ${i + 1} NAME:\n\n ${
          p.pageName
        } \n\n#### Requirements & Details:\n\n ${p.pageDetails}`
    ).join("\n\n"),
  });

  intakeMetadata.push({
    name: "branding.theme",
    value: _.get(jsonData, "form.branding.theme.value"),
  });

  const webSitesForInspiration = _.get(jsonData, "form.branding.inspiration");

  if (
    webSitesForInspiration &&
    webSitesForInspiration.length > 0 &&
    _.filter(webSitesForInspiration, (w) => !_.isEmpty(w.website.value))
      .length > 0
  ) {
    intakeMetadata.push({
      name: "branding.websitesForInspiration",
      value: `### INSPIRATION: \n\n ${_.map(
        webSitesForInspiration,
        (w) =>
          `Website Address: [${w.website.value}](${w.website.value})\n - ${w.feedback.value}`
      )}`,
    });
  } else {
    intakeMetadata.push({
      name: "branding.websitesForInspiration",
      value: "\n",
    });
  }

  const anythingToAvoid = _.get(
    jsonData,
    "form.branding.anythingToAvoid.value",
    "None"
  );

  intakeMetadata.push({
    name: "branding.anythingToAvoid",
    value: anythingToAvoid !== "" ? anythingToAvoid : "None",
  });

  intakeMetadata.push({
    name: "branding.colorOption",
    value: _.get(jsonData, "form.branding.colorOption.option", ["None"]).join(
      ", "
    ),
  });

  intakeMetadata.push({
    name: "branding.specificColor",
    value: _.get(jsonData, "form.branding.specificColor.value", "None"),
  });

  intakeMetadata.push({
    name: "branding.fontOption",
    value: _.get(jsonData, "form.branding.fontOption.option", "None"),
  });

  const fontUrl = _.get(jsonData, "form.branding.fontUrl.option");

  intakeMetadata.push({
    name: "branding.fontUrl",
    value: fontUrl ? `[${fontUrl}](${fontUrl})` : "None",
  });

  const fontUsage = _.get(
    jsonData,
    "form.branding.fontUsageDescription.option",
    "None"
  );

  intakeMetadata.push({
    name: "branding.fontUsageDescription",
    value: fontUsage,
  });

  const assetsUrl = _.get(jsonData, "form.branding.assetsUrl.option");

  intakeMetadata.push({
    name: "branding.assetsUrl",
    value: assetsUrl ? `[${assetsUrl}](${assetsUrl})` : "None",
  });

  const stockPhotos = _.get(
    jsonData,
    "form.branding.allowStockOption.option",
    "Yes, allow stock photos"
  );

  const stockPhotosText =
    stockPhotos === "Yes, allow stock photos"
      ? "Yes, stock photos allowed. [See this page for more details.](https://www.topcoder.com/thrive/articles/stock-artwork-font-and-icon-policies)"
      : "No, stock photos not allowed";

  intakeMetadata.push({
    name: "branding.stockPhotos",
    value: stockPhotosText,
  });

  intakeMetadata.push({
    name: "allowStockArt",
    value: _.toString(
      (stockPhotos !== "" ? stockPhotos : "Yes, allow stock photos") ===
        "Yes, allow stock photos"
    ),
  });

  const selectedDeliverableOption = _.get(
    jsonData,
    "form.branding.selectedDeliverableOption.option"
  );
  let selectedDeliverableOptionFormatted;
  switch (selectedDeliverableOption) {
    case "Any (recommended for best participation)":
      selectedDeliverableOptionFormatted =
        "Design source files must be created with AdobeXD, Figma or Sketch applications";
      break;
    case "Adobe XD":
      selectedDeliverableOptionFormatted =
        "Design source files must be created with AdobeXD application.";
      break;
    case "Figma":
      selectedDeliverableOptionFormatted =
        "Design source files must be created with Figma application.";
      break;
    case "Sketch":
      selectedDeliverableOptionFormatted =
        "Design source files must be created with Sketch application.";
      break;
    case "Other":
      selectedDeliverableOptionFormatted = `Design source files must be created with ${_.get(
        jsonData,
        "form.branding.customDeliverable.option"
      )} application.`;
      break;
    default:
      selectedDeliverableOptionFormatted =
        "Design source files must be created with AdobeXD, Figma or Sketch applications";
  }

  intakeMetadata.push({
    name: "branding.selectedDeliverableOption",
    value: selectedDeliverableOptionFormatted,
  });

  intakeMetadata.push({
    name: "submissionLimit",
    value: JSON.stringify({ unlimited: "true", limit: "false", count: "" }),
  });

  intakeMetadata.push({
    name: "submissionsViewable",
    value: "false",
  });

  const dynamicPriceAndTimeline = getDynamicPriceAndTimeline(
    numOfPages,
    numOfDevices
  );

  const body = {
    ...(name ? { name } : {}),
    ...templateData,
    metadata: [
      ..._.map(
        _.filter(intakeMetadata, (e) => !_.isEmpty(e.value)),
        (e) => ({
          ...e,
          value:
            _.toString(e.value).trim() === "" ? "None" : _.toString(e.value),
        })
      ),
      {
        name: "intake-form",
        value: intakeForm,
      },
    ],
  };
  if (dynamicPriceAndTimeline) {
    body.prizeSets = dynamicPriceAndTimeline.prizeSets;
    body.phases = [
      {
        // Submission
        phaseId: "6950164f-3c5e-4bdc-abc8-22aaf5a1bd49",
        duration: (dynamicPriceAndTimeline.totalDuration - 2) * 86400,
      },
      {
        // Registration
        phaseId: "a93544bc-c165-4af4-b55e-18f3593b457a",
        duration: (dynamicPriceAndTimeline.totalDuration - 2) * 86400,
      },
      ...DEFAULT_TIMELINE,
    ];
  }

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
