/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Basic Info Form component
 */
import FormField from "components/FormElements/FormField";
import FormInputText from "components/FormElements/FormInputText";
import HelpBanner from "components/HelpBanner";
import PageDivider from "components/PageDivider";
import PageP from "components/PageElements/PageP";
import PageRow from "components/PageElements/PageRow";
import RadioButton from "components/RadioButton";
import FormInputTextArea from "components/FormElements/FormInputTextArea";
import ServicePrice from "components/ServicePrice";
import { HELP_BANNER } from "constants/";
import PT from "prop-types";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import DataExplorationIcon from "../../../../assets/images/data-exploration-icon.svg";
import FindMeDataIcon from "../../../../assets/images/find-me-data-icon.svg";
import "./styles.module.scss";
import { PrimaryDataChallengeOptions } from "../../../../constants";

const BasicInfoForm = ({
  formData,
  serviceType,
  onFormUpdate,
  onShowSupportModal,
  estimate,
  bannerData,
}) => {
  const handleInputChange = (name, value, option = "") => {
    onFormUpdate({ ...formData, [name]: { ...formData[name], option, value } });
  };
  const [primaryDataChallenge, setPrimaryDataChallenge] = useState(
    PrimaryDataChallengeOptions
  );

  const {
    title,
    helperBannerTitle,
    helperBannerContent,
    aboutBannerTitle,
    aboutBannerContent,
  } = bannerData;

  const isDataExploration = title === "Data Exploration";
  const isOtherOptionSelected = formData?.primaryDataChallenge?.value !== 3;

  useEffect(() => {
    const itemSelected = formData?.primaryDataChallenge;

    if (itemSelected?.option && primaryDataChallenge[0]) {
      const newDeliverableOptions = primaryDataChallenge.map((o) => {
        o.value = o.label === itemSelected.option;
        return o;
      });
      setPrimaryDataChallenge(newDeliverableOptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.primaryDataChallenge]);

  useEffect(() => {
    if (
      isOtherOptionSelected &&
      formData?.primaryDataChallengeOther?.value?.trim().length
    ) {
      handleInputChange("primaryDataChallengeOther", "", "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryDataChallenge, setPrimaryDataChallenge]);

  return (
    <div styleName="basicInfoForm">
      <ServicePrice
        price={estimate?.total}
        stickerPrice={estimate?.stickerPrice}
        duration={estimate?.totalDuration}
        serviceType={serviceType}
        hideTitle
        showIcon
        icon={
          title === "Data Exploration" ? (
            <DataExplorationIcon />
          ) : (
            <FindMeDataIcon />
          )
        }
      />
      <HelpBanner defaultOpen title={helperBannerTitle} styles={["gray"]}>
        {helperBannerContent}
      </HelpBanner>

      <HelpBanner title={aboutBannerTitle} styles={["turqoise"]}>
        {aboutBannerContent}
      </HelpBanner>

      <PageDivider />

      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">PROJECT TITLE</PageP>
          <PageP styleName="description">
            Give your project a descriptive title. This is what the data
            scientists will see when looking for your work.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"Project Title"}>
            <FormInputText
              placeholder={"Enter a descriptive title"}
              value={
                isDataExploration
                  ? formData.projectTitle.value
                  : formData.findMeProjectTitle.value
              }
              name={isDataExploration ? "projectTitle" : "findMeProjectTitle"}
              onChange={(e) =>
                handleInputChange(e.target.name, e.target.value, e.target.value)
              }
            />
          </FormField>
        </div>
      </PageRow>

      {isDataExploration && (
        <PageRow styleName="form-row">
          <div>
            <PageP styleName="title">Share Your Data (optional)</PageP>
            <PageP styleName="description">
              Add links (separate multiple links with commas) or upload your
              data files here. Not ready or able to share? No problem, we'll
              work with you on that later.
            </PageP>
          </div>

          <div styleName="formFieldWrapper">
            <div styleName="assets">
              <FormField label={"Shareable URL Link(s)"}>
                <FormInputText
                  placeholder={"www.example-share-link.com"}
                  value={formData?.assetsUrl?.value}
                  name="assetsUrl"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.name,
                      e.target.value,
                      e.target.value
                    )
                  }
                />
              </FormField>
            </div>
          </div>
        </PageRow>
      )}

      {!isDataExploration && (
        <PageRow styleName="form-row">
          <div>
            <PageP styleName="title">{"What Data Do You Need?"}</PageP>
            <PageP styleName="description">
              Briefly describe the analysis you want to do, and the type of data
              you're looking for to do it. Be sure to include any critical data
              requirements, such as specific geographies, demographics, date
              ranges and/or key variables needed for your analysis.{" "}
            </PageP>
            <HelpBanner title="Example" styles={["gray"]}>
              <br />
              <PageP>
                I'm a real estate investor & want to diversify into other cities
                in Texas. Currently, we only invest in Dallas Fort Worth. We're
                looking for 3-5 other cities in Texas to invest. I'd like to
                evaluate rental demand and occupancy rates, property price vs.
                avg rental payments, job and population growth compared to state
                and national averages, and the trends of renter-occupied
                households compared to homeowners. I think there's data on sites
                like{" "}
                <a target="_blank" href="https://www.zillow.com/">
                  {" "}
                  zillow.com
                </a>{" "}
                and{" "}
                <a target="_blank" href="https://www.hotpads.com/">
                  {" "}
                  hotpads.com
                </a>
                , but it's hard to find and organize.
              </PageP>
              <br />
              <PageP>
                Not sure what data you need? Consider{" "}
                <a target="_blank" href="https://topcoder.com">
                  {" "}
                  Problem Statement & Data Advisory
                </a>{" "}
                to get clarity on the best data & approach for your goals.
              </PageP>
            </HelpBanner>
          </div>

          <div styleName="formFieldWrapper">
            <FormField label={"Analysis & Data Description"}>
              <FormInputTextArea
                value={formData?.analysis?.value}
                onChange={(e) =>
                  handleInputChange(
                    e.target.name,
                    e.target.value,
                    e.target.value
                  )
                }
                styleName={"text-area"}
                name="analysis"
                placeholder={
                  "Describe your analysis goal and data requirements"
                }
              />
            </FormField>
          </div>
        </PageRow>
      )}

      <PageDivider />

      {isDataExploration && (
        <PageRow styleName="form-row">
          <div>
            <PageP styleName="title">{"what would you like to learn?"}</PageP>
            <PageP styleName="description">
              Describe your data and what you would like to learn about it. If
              you have a formal problem statement, please share it.
            </PageP>
            <HelpBanner title="Example" styles={["gray"]}>
              <br />
              <PageP>
                I spend money on marketing for my website, but it's hard to know
                which marketing option works best. I make money from
                advertising, so the more people that visit my site and engage
                with something, the more ad money I can make. I shared the
                reports I have from the past year for each of my 3 marketing
                channels. I'd like to know how that data can help understand
                where to focus my marketing spend.
              </PageP>
            </HelpBanner>
          </div>

          <div styleName="formFieldWrapper">
            <FormField label={"Goals & Data Description"}>
              <FormInputTextArea
                value={formData?.goals?.value}
                onChange={(e) =>
                  handleInputChange(
                    e.target.name,
                    e.target.value,
                    e.target.value
                  )
                }
                styleName={"text-area"}
                name="goals"
                placeholder={"Enter your goals and descriptions here"}
              />
            </FormField>
          </div>
        </PageRow>
      )}

      {!isDataExploration && (
        <PageRow styleName="form-row">
          <div>
            <PageP styleName="title">{"Primary Data Challenge"}</PageP>
            <PageP styleName="description">
              Select the primary data challenge you're facing.
            </PageP>
          </div>

          <div styleName="formFieldWrapper">
            <RadioButton
              onChange={(items) => {
                const selectedOption = items.findIndex((item) => item.value);
                const foundOption = items.find((item) => item.value);
                handleInputChange(
                  "primaryDataChallenge",
                  selectedOption,
                  foundOption.label
                );
              }}
              size="lg"
              options={primaryDataChallenge}
            />
            <br />
            <FormField
              label={"Primary Data Challenge"}
              disabled={isOtherOptionSelected}
            >
              <FormInputText
                placeholder={"Specify your primary data challenge"}
                value={formData?.primaryDataChallengeOther?.value}
                name="primaryDataChallengeOther"
                onChange={(e) =>
                  handleInputChange(
                    e.target.name,
                    e.target.value,
                    e.target.value
                  )
                }
                disabled={isOtherOptionSelected}
              />
            </FormField>
          </div>
        </PageRow>
      )}

      <PageDivider />

      {!isDataExploration && (
        <PageRow styleName="form-row">
          <div>
            <PageP styleName="title">Sample Data</PageP>
            <PageP styleName="description">
              Sample data helps us understand your data needs. Often this is a
              simple CSV/Excel table that shows the data labels (usually the
              title of each column or row) and two or more rows of example input
              data. Example: FName is a data label, 'Ankit' is input data.
            </PageP>
          </div>

          <div styleName="formFieldWrapper">
            <div styleName="assets">
              <FormField label={"Shareable URL Link(s)"}>
                <FormInputText
                  placeholder={"www.example-share-link.com"}
                  value={formData?.sampleData?.value}
                  name="sampleData"
                  onChange={(e) =>
                    handleInputChange(
                      e.target.name,
                      e.target.value,
                      e.target.value
                    )
                  }
                />
              </FormField>
            </div>
          </div>
        </PageRow>
      )}

      {!isDataExploration && <PageDivider />}

      <HelpBanner
        title={HELP_BANNER.title}
        description={HELP_BANNER.description}
        contactSupport={onShowSupportModal}
      />
    </div>
  );
};

BasicInfoForm.defaultProps = {
  serviceType: "",
};

BasicInfoForm.propTypes = {
  estimate: PT.shape().isRequired,
  serviceType: PT.string,
  onFormUpdate: PT.func,
  formData: PT.shape(),
  bannerData: PT.shape().isRequired,
};

export default BasicInfoForm;
