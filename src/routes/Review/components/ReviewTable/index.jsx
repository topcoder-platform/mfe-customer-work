import { Link } from "@reach/router";
import classNames from "classnames";
import PageDivider from "components/PageDivider";
import { ProgressLevels } from "constants/";
import React, { useState } from "react";
import _ from "lodash";
import ArrowIcon from "../../../../assets/images/icon-arrow.svg";
import "./styles.module.scss";

/**
 * Review Table Component
 */
const ReviewTable = ({ formData, enableEdit = true }) => {
  const [steps, setSteps] = useState([
    {
      id: 0,
      label: "REVIEW REQUIREMENTS",
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
          <div styleName="detail">
            <div styleName="itemWrapper">
              <p styleName="item">{option.title || title}</p>
            </div>
            <p styleName="key">{formatOption(option.option)}</p>
          </div>
        )}
      </div>
    );
  };

  const renderDetails = (step) => {
    let items = formData[step.value] || {};
    if (formData?.workType?.selectedWorkType === "Find Me Data") {
      items = _.omit(items, ["projectTitle", "assetsUrl", "goals"]);
    } else {
      items = _.omit(items, [
        "findMeProjectTitle",
        "analysis",
        "primaryDataChallenge",
        "primaryDataChallengeOther",
        "sampleData",
      ]);
    }
    return Object.keys(items).map((key) => {
      if (_.isArray(items[key]))
        return _.map(items[key], (item, i) => (
          <div styleName="detail" key={i}>
            <div styleName="itemWrapper">
              <p styleName="item">
                {key} {i + 1}
              </p>
            </div>
            <p styleName="key">
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
            <div styleName="detail">
              <div styleName="itemWrapper">
                <p styleName="item">Page {index + 1} Name</p>
              </div>
              <p styleName="key">{page?.pageName}</p>
            </div>
          )}
          {page?.pageDetails && (
            <div styleName="detail">
              <div styleName="itemWrapper">
                <p styleName="item">Page {index + 1} Requirements</p>
              </div>
              <p styleName="key">{page?.pageDetails}</p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {steps
        .filter((s) => {
          if (s.value === "pageDetails")
            return _.get(formData[s.value], "pages[0].pageDetails") !== "";
          return !!formData[s.value];
        })
        .map((step, index) => {
          let redirectPage = ProgressLevels.find(
            (item) => item.label === step.label
          );
          let redirectUrl = redirectPage?.url;
          if (formData?.workType?.selectedWorkType === "Find Me Data") {
            redirectUrl = redirectPage?.url.replace(
              "data-exploration",
              "find-me-data"
            );
          }
          if (formData?.workType?.selectedWorkType === "Website Design") {
            redirectUrl = redirectPage?.url.replace(
              "data-exploration",
              "website-design"
            );
          }
          if (formData?.workType?.selectedWorkType === "Problem Statement & Data Advisory") {
            redirectUrl = redirectPage?.url.replace(
              "data-exploration",
              "data-advisory"
            );
          }
          return (
            <>
              <div
                styleName="header"
                role="button"
                tabIndex={0}
                onClick={() => setStepToggler(index)}
              >
                <p styleName="stepLabel">
                  {step.label}
                  {enableEdit && (
                    <Link styleName="link" to={redirectUrl}>
                      edit
                    </Link>
                  )}
                </p>
                <div
                  styleName={classNames("icon", step.isOpen ? "open" : null)}
                >
                  <ArrowIcon />
                </div>
              </div>

              {step.isOpen
                ? step.value === "pageDetails"
                  ? renderPageDetails(step)
                  : renderDetails(step)
                : null}

              <PageDivider />
            </>
          );
        })}
    </>
  );
};

export default ReviewTable;
