/**
 * Tab element
 */
import FormField from "components/FormElements/FormField";
import FormInputText from "components/FormElements/FormInputText";
import FormInputTextArea from "components/FormElements/FormInputTextArea";
import PageDivider from "components/PageDivider";
import PageP from "components/PageElements/PageP";
import PageRow from "components/PageElements/PageRow";
import Select from "components/ReactSelect";
import ServicePrice from "components/ServicePrice";
import { IndustryList } from "constants/";
import PT from "prop-types";
import React from "react";
import "./styles.module.scss";

const WebsitePurposeForm = ({ formData, setFormData, price, serviceType }) => {
  const handleInputChange = (name, value, option = null) => {
    setFormData((formData) => ({
      ...formData,
      [name]: { ...formData[name], option: option ? option : value, value },
    }));
  };

  return (
    <div styleName="websitePurposeForm">
      <ServicePrice price={price} serviceType={serviceType} />

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Your industry</PageP>
          <PageP styleName="description">
            Knowing the industry that you want your website designed for will
            help the designers understand some basic visual directions and
            overall tone of your website design.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"Your Industry"}>
            <Select
              value={formData?.industry?.value}
              onChange={(option) => {
                handleInputChange("industry", option, option.label);
              }}
              options={IndustryList}
              style2={true}
              placeholder={"Select industry"}
            />
          </FormField>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">DESCRIPTION</PageP>
          <PageP styleName="description">
            Describe what your website does. This can include general
            descriptions as well as goals of the website...{" "}
          </PageP>
          <br />
          <PageP styleName="description">
            <strong>Example:</strong> <br />A dog walking website that allows
            visitors to select dog walkers and schedule dog walking
            appointments.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"Design Brief"}>
            <FormInputTextArea
              value={formData?.description?.value}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              styleName={"text-area"}
              name="description"
              placeholder={"Describe your website"}
            />
          </FormField>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">USERS</PageP>
          <PageP styleName="description">Who will use your website?</PageP>
          <br />
          <PageP styleName="description">
            <strong>Example:</strong> <br />A dog walking website that allows
            visitors to select dog walkers and schedule dog walking
            appointments.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"User Story"}>
            <FormInputTextArea
              value={formData?.userStory?.value}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              styleName={"text-area"}
              name="userStory"
              placeholder={"Enter your user story"}
            />
          </FormField>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">EXISTING WEBSITE?</PageP>
          <PageP styleName="description">
            If you have an existing website, please enter it here. Are we
            designing new pages for your existing website? Or are we redesigning
            your current website? Please add additional information on how the
            designers should reference and use your existing website.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"Existing Website (Optional)"}>
            <FormInputText
              placeholder={"Enter website url. E.g. www.acme.com"}
              value={formData?.existingWebsite?.value}
              name="existingWebsite"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </FormField>
          <FormField label={"Existing Website Information (Optional)"}>
            <FormInputTextArea
              value={formData?.existingWebsiteInfo?.value}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              styleName={"text-area"}
              name="existingWebsiteInfo"
              placeholder={
                "Anything we should know about your existing website"
              }
            />
          </FormField>
        </div>
      </PageRow>
    </div>
  );
};

WebsitePurposeForm.defaultProps = {
  price: 0,
  serviceType: "",
};

WebsitePurposeForm.propTypes = {
  price: PT.string,
  serviceType: PT.string,
  formData: PT.shape(),
  setFormData: PT.func,
};

export default WebsitePurposeForm;
