import React from "react";
import { WorkDetailDetailsPane, WorkType } from "../../../../../src-ts";

/**
 * Review Table Component
 */
const ReviewTable = ({ formData, enableEdit = true }) => {
  const [steps, setSteps] = useState([
    {
      id: 0,
      label: "Review Your Project Details",
      value: "basicInfo",
      isOpen: true,
    },
    { id: 1, label: "Website Purpose", value: "websitePurpose", isOpen: true },
    { id: 2, label: "Page Details", value: "pageDetails", isOpen: true },
    { id: 3, label: "Branding", value: "branding", isOpen: true },
  ]);

  const setStepToggler = (id) => {
    const newSteps = steps.map((item) =>
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    );

    setSteps(newSteps);
  };

  const formatOption = (option) => {
    if (_.isArray(option)) return option.join(", ");
    if (_.isObject(option)) {
      return formatOption(_.get(option, "option", option));
    }
    return option;
  };

  const renderOption = (option, title) => {
    return (
      <div>
        {option.option && (
          <div>
            <div >
              <p>{option.title || title}</p>
            </div>
            <p>{formatOption(option.option)}</p>
          </div>
        )}
      </div>
    );
  };

  const renderDetails = (step) => {
    let items = formData[step.value] || {};
    if (formData?.workType?.selectedWorkType === "Find Me Data") {
      items = _.omit(items, ["assetsUrl", "goals"]);
    } else {
      items = _.omit(items, [
        "analysis",
        "primaryDataChallenge",
        "primaryDataChallengeOther",
        "sampleData",
      ]);
    }
    return Object.keys(items).map((key) => {
      if (_.isArray(items[key]))
        return _.map(items[key], (item, i) => (
          <div key={i}>
            <div>
              <p>
                {key} {i + 1}
              </p>
            </div>
            <p>
              {Object.keys(item).map((subKey) =>
                renderOption(item[subKey], subKey)
              )}
            </p>
          </div>
        ));
      return renderOption(items[key]);
    });
  };

  const renderPageDetails = (step) => {
    const items = formData[step.value] || {};
    const pages = items?.pages || [];

    return pages.map((page, index) => {
      return (
        <div>
          {page?.pageName && (
            <div >
              <div >
                <p >Page {index + 1} Name</p>
              </div>
              <p >{page?.pageName}</p>
            </div>
          )}
          {page?.pageDetails && (
            <div >
              <div >
                <p >Page {index + 1} Requirements</p>
              </div>
              <p>{page?.pageDetails}</p>
            </div>
          )}
        </div>
      );
    });
  };

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
