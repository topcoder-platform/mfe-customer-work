/**
 * Tab element
 */
import Button from "components/Button";
import FormField from "components/FormElements/FormField";
import FormInputText from "components/FormElements/FormInputText";
import FormInputTextArea from "components/FormElements/FormInputTextArea";
import PageDivider from "components/PageDivider";
import PageP from "components/PageElements/PageP";
import PageRow from "components/PageElements/PageRow";
import RadioButton from "components/RadioButton";
import Select from "components/ReactSelect";
import ServicePrice from "components/ServicePrice";
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  ColorOptionsItems,
  DeliverablesOptions,
  DesignOptions,
} from "constants/";
import PT from "prop-types";
import React, { useEffect, useState } from "react";
import ColorOptions from "../ColorOptions";
import FontOptions from "../FontOptions";
import "./styles.module.scss";

const BrandingForm = ({ price, serviceType, setFormData, formData }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);

  const handleInputChange = (name, value, option = null) => {
    setFormData((formData) => ({
      ...formData,
      [name]: { ...formData[name], option: option ? option : value, value },
    }));
  };

  useEffect(() => {
    if (formData.colorOption) {
      setSelectedColor(formData?.colorOption?.value);
    }
  }, [formData.colorOption]);

  useEffect(() => {
    if (formData.fontOption) {
      setSelectedFont(formData.fontOption?.value);
    }
  }, [formData.fontOption]);

  const deliverableOptions = DeliverablesOptions;
  useEffect(() => {
    if (formData?.selectedDeliverableOption?.value) {
      deliverableOptions[
        formData?.selectedDeliverableOption?.value
      ].value = true;
    }
  }, [formData, deliverableOptions]);

  return (
    <div styleName="brandingForm">
      <ServicePrice price={price} serviceType={serviceType} />

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">{"STYLE & THEME"}</PageP>
          <PageP styleName="description">
            What ideas do you have for the overall style/ theme of your
            website...
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"Style & Theme"}>
            <FormInputTextArea
              value={formData?.theme?.value}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              styleName={"text-area"}
              name="theme"
              placeholder={"Be as descriptive as possible"}
            />
          </FormField>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Inspiration</PageP>
          <PageP styleName="description">
            Are there other website that you like that the designers can draw
            inspiration from? List websites you like and describe what you like
            about them.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"Website Address (optional)"}>
            <FormInputText
              placeholder={"Enter website url. E.g. www.acme.com"}
              value={formData?.website?.value}
              name="website"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </FormField>
          <FormField label={"What Do You Like (optional)"}>
            <FormInputTextArea
              value={formData?.description?.value}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              styleName={"text-area"}
              name="description"
              placeholder={"Describe what you like about this website"}
            />
          </FormField>

          <Button type={BUTTON_TYPE.SECONDARY} size={BUTTON_SIZE.MEDIUM}>
            ADD ANOTHER WEBSITE
          </Button>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">COLORS</PageP>
          <PageP styleName="description">
            Pick up to three colors you'd like your designers to use when
            designing. You can also specify your specific brand colors.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <ColorOptions
            colors={ColorOptionsItems}
            selectedColor={selectedColor}
            onSelect={(index, colorName) => {
              setSelectedColor(index);
              handleInputChange("colorOption", index, colorName);
            }}
          />
          {selectedColor === ColorOptionsItems.length - 1 && (
            <FormField label={"I Have Specific Colors (optional)"}>
              <FormInputTextArea
                value={formData?.specificColor?.value}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                styleName={"text-area"}
                name="specificColor"
                placeholder={
                  "Specify colors using their value in RGB, CMYK, or Hex"
                }
              />
            </FormField>
          )}
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">FONTS</PageP>
          <PageP styleName="description">
            Choose your general font style preference. If you have specific
            fonts that should be used, please upload them.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FontOptions
            selectedFont={selectedFont}
            onSelect={(index, fontName) => {
              setSelectedFont(index);
              handleInputChange("fontOption", index, fontName);
            }}
          />

          <div styleName="uploadFonts">
            <p>I have specific fonts I want to use</p>
            <Button type={BUTTON_TYPE.SECONDARY} size={BUTTON_SIZE.MEDIUM}>
              UPLOAD FONTS
            </Button>
          </div>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Other Assets (optional)</PageP>
          <PageP styleName="description">
            Do you have any additional assets that would be helpful to the
            designers? E.g. Your current logo, branding direction, photos,
            illustrations, content, layout ideas, etc.{" "}
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <div styleName="assets">
            <p>Package all assets into a single .zip file before uploading</p>
            <Button type={BUTTON_TYPE.SECONDARY} size={BUTTON_SIZE.MEDIUM}>
              UPLOAD OTHER ASSETS
            </Button>
          </div>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Anything to avoid? (optional)</PageP>
          <PageP styleName="description">
            If there are any themes, ideas, or specific directions that the
            designers should avoid, please let us know. Be as descriptive as
            possible.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"Anything To Avoid? (Optional)"}>
            <FormInputTextArea
              value={formData?.anythingToAvoid?.value}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              styleName={"text-area"}
              name="anythingToAvoid"
              placeholder={"Describe themes or ideas to avoid"}
            />
          </FormField>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Allow Stock Photos?</PageP>
          <PageP styleName="description">
            There may be additional costs for designs that use stock images.
            Designers will include details for stock images, so you can buy
            stock at the end of your contest.{" "}
            <a href="/" role="button" tabIndex={0} styleName="link">
              Learn more about our stock photo policy
            </a>
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FormField label={"Allow Stock Photos?"}>
            <Select
              value={formData?.design?.value}
              onChange={(option) => {
                handleInputChange("design", option, option.label);
              }}
              options={DesignOptions}
              style2={true}
              placeholder={"Select Design Options"}
            />
          </FormField>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Final Deliverable Source Files</PageP>
          <PageP styleName="description">
            If the designers must design your website in a specific design
            software, please specify...{" "}
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <RadioButton
            onChange={(items) => {
              const selectedOption = items.findIndex((item) => item.value);
              const foundOption = items.find((item) => item.value);
              handleInputChange(
                "selectedDeliverableOption",
                selectedOption,
                foundOption.label
              );
            }}
            size="lg"
            options={deliverableOptions}
          />

          {formData.selectedDeliverableOption === 4 && (
            <div styleName="customDeliverable">
              <FormField label={"Custom Deliverable Source"}>
                <FormInputText
                  placeholder={"Describe your custom deliverable source file"}
                  value={formData?.customDeliverable?.value}
                  name="customDeliverable"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </FormField>
            </div>
          )}
        </div>
      </PageRow>
    </div>
  );
};

BrandingForm.defaultProps = {
  price: 0,
  serviceType: "",
};

BrandingForm.propTypes = {
  price: PT.string,
  serviceType: PT.string,
  formData: PT.shape(),
  setFormData: PT.func,
};

export default BrandingForm;
