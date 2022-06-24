import _ from "lodash";
import {
  CHALLENGE_FIELD_VALUES,
  DEFAULT_TIMELINE,
} from "constants/products/FindMeData";
import { getFindMeDataPriceAndTimelineEstimate } from "utils/";
import { workFactoryMapFormData } from "../../../../src-ts";

export function formatChallengeCreationBody() {
  return {
    description: "Information not provided",
    discussions: [
      {
        name: "new-self-service-project",
        type: "challenge",
        provider: "vanilla",
      },
    ],
    legacy: {
      selfService: true,
    },
    name: "new-self-service-project",
    tags: ["Find Me Data"],
    timelineTemplateId: CHALLENGE_FIELD_VALUES.timelineTemplateId,
    trackId: CHALLENGE_FIELD_VALUES.trackId,
    typeId: CHALLENGE_FIELD_VALUES.typeId,
  };
}

// TODO: This function was written specifically for PROD-2101 but it is agnostic
// of WorkType intake. The other work types will need to get fixed as well,
// and theoretically they should all be able to call this function
export function formatChallengeUpdateBody(intakeForm) {
  const form = JSON.parse(intakeForm)?.form;
  const data = workFactoryMapFormData(
    form?.workType?.selectedWorkType,
    form?.basicInfo
  );

  const intakeMetadata = [
    {
      name: "intake-form",
      value: intakeForm,
    },
  ];

  //This is the Markdown string that gets displayed in Work Manager app and others
  const templateString = [];

  Object.keys(data).forEach((key) => {
    if (!data[key]) return;

    intakeMetadata.push({
      name: key,
      value: data[key].value,
    });
    templateString.push(
      `### ${data[key].title}\n\n${formatOption(data[key].value)}\n\n`
    );
  });

  const dynamicPriceAndTimeline = getFindMeDataPriceAndTimelineEstimate();

  const body = {
    description: templateString.join(""),
    metadata: intakeMetadata,
    name: form?.basicInfo?.projectTitle?.value,
  };
  if (dynamicPriceAndTimeline) {
    body.prizeSets = dynamicPriceAndTimeline.prizeSets;
    body.phases = [...DEFAULT_TIMELINE];
  }
  return body;
}

function formatOption(detail) {
  const noInfoProvidedText = "Not provided";
  const isEmpty = checkIsEmpty(detail);
  if (isEmpty) {
    return noInfoProvidedText;
  }
  if (_.isArray(detail)) {
    return detail.join("\n");
  }
  if (_.isObject(detail)) {
    return Object.keys(detail)
      .map((key) => {
        const value = detail[key] || noInfoProvidedText;
        return `${key}: ${value}`;
      })
      .join("\n");
  }
  return detail;
}

function checkIsEmpty(detail) {
  return (
    !detail ||
    (typeof detail === "string" && detail.trim().length === 0) ||
    (_.isArray(detail) && detail.length === 0) ||
    (_.isObject(detail) &&
      Object.values(detail).filter((val) => val && val.trim().length !== 0)
        .length === 0)
  );
}
