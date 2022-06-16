import React from "react";
import { WorkType, WorkDetailDetailsPane } from "../../../../../src-ts";

/**
 * Review Table Component
 */
const ReviewTable = ({ formData }) => {
  const redirectUrl = getRedirectUrl(formData?.workType?.selectedWorkType);
  return (
    <WorkDetailDetailsPane
      formData={formData}
      isReviewPage={true}
      redirectUrl={redirectUrl}
    />
  );
};

export default ReviewTable;

const getRedirectUrl = (type) => {
  let path = "";
  switch (type) {
    case WorkType.problem:
      path = "data-advisory";
      break;
    case WorkType.data:
      path = "data-exploration";
      break;
    case WorkType.findData:
      path = "find-me-data";
      break;
    case WorkType.design:
      path = "website-design";
      break;
  }

  return `/self-service/work/new/${path}/basic-info`;
};
