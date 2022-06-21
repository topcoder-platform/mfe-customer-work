import _ from "lodash";
import {
  CHALLENGE_FIELD_VALUES,
  DEFAULT_TIMELINE,
} from "../../../constants/products/DataAdvisory";
import templateData from "../../../assets/data/spec-templates/data-exploration.json";
import { getDataAdvisoryPriceAndTimelineEstimate } from "utils/";

export function formatChallengeCreationBody() {
  return {
    typeId: CHALLENGE_FIELD_VALUES.typeId,
    trackId: CHALLENGE_FIELD_VALUES.trackId,
    timelineTemplateId: CHALLENGE_FIELD_VALUES.timelineTemplateId,
    name: "new-self-service-project",
    ...templateData,
    legacy: {
      selfService: true,
    },
    tags: ["Data Science"],
    discussions: [
      {
        name: "new-self-service-project",
        type: "challenge",
        provider: "vanilla",
      },
    ],
  };
}

export function formatChallengeUpdateBody(intakeForm) {
  const jsonData = JSON.parse(intakeForm);
  const name = _.get(jsonData, "form.basicInfo.projectTitle.value");

  const intakeMetadata = [];

  intakeMetadata.push({
    name: "goals",
    required: true,
    value: _.get(jsonData, "form.basicInfo.goals.value"),
  });

  const shareableLinks = _.get(
    jsonData,
    "form.basicInfo.assetsUrl.value",
    ""
  ).split(",");
  let shareableLinksContent = "";
  if (shareableLinks.length > 0) {
    shareableLinksContent = `## Access to the Data \n\n Please find the data in the following link(s): \n\n ${_.map(
      shareableLinks,
      (l) => `- [${l}](${l}) \n\n `
    )}`;
  }

  const dynamicPriceAndTimeline = getDataAdvisoryPriceAndTimelineEstimate();

  const body = {
    ...(name ? { name } : {}),
    ...templateData,
    metadata: [
      ..._.map(intakeMetadata, (e) => ({
        name: e.name,
        value:
          _.toString(e.value).trim() === ""
            ? e.required
              ? ""
              : "None"
            : _.toString(e.value),
      })),
      {
        name: "intake-form",
        value: intakeForm,
      },
    ],
  };
  if (dynamicPriceAndTimeline) {
    body.prizeSets = dynamicPriceAndTimeline.prizeSets;
    body.phases = [...DEFAULT_TIMELINE];
  }
  return body;
}
