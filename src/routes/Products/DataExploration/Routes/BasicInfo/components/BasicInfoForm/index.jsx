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
import FormInputTextArea from "components/FormElements/FormInputTextArea";
import ServicePrice from "components/ServicePrice";
import { HELP_BANNER } from "constants/";
import PT from "prop-types";
import _ from "lodash";
import React from "react";
import DataExplorationIcon from "../../../../../../../assets/images/data-exploration-icon.svg";
import "./styles.module.scss";
import PageUl from "components/PageElements/PageUl";

const BasicInfoForm = ({
  formData,
  serviceType,
  onFormUpdate,
  onShowSupportModal,
  estimate,
}) => {
  const handleInputChange = (name, value, option = "") => {
    onFormUpdate({ ...formData, [name]: { ...formData[name], option, value } });
  };

  return (
    <div styleName="basicInfoForm">
      <ServicePrice
        price={estimate?.total}
        duration={estimate?.totalDuration}
        serviceType={serviceType}
        hideTitle
        showIcon
        icon={<DataExplorationIcon />}
      />
      <HelpBanner defaultOpen title="WHAT WILL I RECEIVE?" styles={["gray"]}>
        <br />
        <PageUl>
          <li>Clear written analysis of your data and key findings</li>
          <li>
            Visuals of the most compelling relationships and patterns in your
            data
          </li>
          <li>
            Expert commentary on the relevance of findings to your goals and
            recommendations for further analysis
          </li>
        </PageUl>
      </HelpBanner>
      <HelpBanner title="ABOUT DATA EXPLORATION" styles={["turqoise"]}>
        <p>
          In Data Exploration, multiple data science experts uncover the most
          significant patterns and relationships in your data. Unlock the full
          potential of your data with expert insights presented in an
          easy-to-understand format.
        </p>
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
              value={formData.projectTitle.value}
              name="projectTitle"
              onChange={(e) =>
                handleInputChange(e.target.name, e.target.value, e.target.value)
              }
            />
          </FormField>
        </div>
      </PageRow>

      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Share Your Data (optional)</PageP>
          <PageP styleName="description">
            Add links (separate multiple links with commas) or upload your data
            files here. Not ready or able to share? No problem, we'll work with
            you on that later.
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

      <PageDivider />

      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">{"what would you like to learn?"}</PageP>
          <PageP styleName="description">
            Describe your data and what you would like to learn about it. If you
            have a formal problem statement, please share it.
          </PageP>
          <HelpBanner title="Example" styles={["gray"]}>
            <br />
            <PageP>
              I spend money on marketing for my website, but it's hard to know
              which marketing option works best. I make money from advertising,
              so the more people that visit my site and engage with something,
              the more ad money I can make. I shared the reports I have from the
              past year for each of my 3 marketing channels. I'd like to know
              how that data can help understand where to focus my marketing
              spend.
            </PageP>
          </HelpBanner>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"Goals & Data Description"}>
            <FormInputTextArea
              value={formData?.goals?.value}
              onChange={(e) =>
                handleInputChange(e.target.name, e.target.value, e.target.value)
              }
              styleName={"text-area"}
              name="goals"
              placeholder={"Enter your goals and descriptions here"}
            />
          </FormField>
        </div>
      </PageRow>

      <PageDivider />

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
};

export default BasicInfoForm;
