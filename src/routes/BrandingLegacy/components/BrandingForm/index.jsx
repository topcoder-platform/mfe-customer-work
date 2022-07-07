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
import ServicePrice from "components/ServicePrice";
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  ColorOptionsItems,
  DeliverablesOptions,
  AllowStockOptions,
} from "constants/";
import PT from "prop-types";
import React, { useEffect, useState } from "react";
import ColorOptions from "../ColorOptions";
import FontOptions from "../FontOptions";
import "./styles.module.scss";
import _ from "lodash";
import Modal from "components/Modal";
import PolicyContent from "../../../../components/Modal/PolicyContent";
import PageH3 from "components/PageElements/PageH3";

const BrandingForm = ({
  serviceType,
  setFormData,
  formData,
  saveBranding,
  estimate,
}) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [deliverableOptions, setDeliverableOptions] =
    useState(DeliverablesOptions);
  const [allowStockOption, setAllowStockOption] = useState(AllowStockOptions);

  const handleInputChange = (name, value, option = null) => {
    setFormData((formData) => {
      const newFormData = {
        ...formData,
        [name]: { ...formData[name], option: option ? option : value, value },
      };
      saveBranding(newFormData);
      return newFormData;
    });
  };

  const handleArrayInputChange = (index, name, key, value, option = null) => {
    setFormData((formData) => {
      const newFormData = {
        ...formData,
      };

      if (!newFormData[name]) {
        newFormData[name] = [
          {
            website: { name, value, option: option ? option : value },
            feedback: { name, value, option: option ? option : value },
          },
        ];
      }

      newFormData[name][index][key] = {
        name,
        value,
        option: option ? option : value,
      };

      saveBranding(newFormData);
      return newFormData;
    });
  };

  const addWebsite = () => {
    setFormData((formData) => {
      const newFormData = {
        ...formData,
        inspiration: [
          ...(formData.inspiration || []),
          {
            website: { name: "Website", value: "", option: "" },
            feedback: { name: "Feedback", value: "", option: "" },
          },
        ],
      };

      saveBranding(newFormData);
      return newFormData;
    });
  };

  const removeWebsite = (index) => {
    setFormData((formData) => {
      const newFormData = {
        ...formData,
      };
      newFormData.inspiration.splice(index, 1);

      saveBranding(newFormData);
      return newFormData;
    });
  };

  useEffect(() => {
    if (formData.colorOption) {
      setSelectedColor(formData?.colorOption);
    }
  }, [formData.colorOption]);

  useEffect(() => {
    if (formData.fontOption) {
      setSelectedFont(formData.fontOption?.value);
    }
  }, [formData.fontOption]);

  useEffect(() => {
    const itemSelected = formData?.selectedDeliverableOption;
    if (itemSelected?.option && deliverableOptions[0]) {
      const newDeliverableOptions = deliverableOptions.map((o) => {
        o.value = o.label === itemSelected.option;
        return o;
      });
      setDeliverableOptions(newDeliverableOptions);
    }

    const optionSelected = formData?.allowStockOption;
    if (optionSelected?.option && allowStockOption[0]) {
      const newAllowStockPhoto = allowStockOption.map((o) => {
        o.value = o.label === optionSelected.option;
        return o;
      });
      setAllowStockOption(newAllowStockPhoto);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.selectedDeliverableOption, formData.allowStockOption]);
  return (
    <div styleName="brandingForm">
      <Modal
        fullWidth
        show={isPolicyModalOpen}
        handleClose={() => setIsPolicyModalOpen(false)}
      >
        <PageH3>STOCK ARTWORK POLICY</PageH3>
        <PageDivider />
        <PolicyContent />
      </Modal>
      <ServicePrice
        price={estimate.total}
        duration={estimate.totalDuration}
        stickerPrice={estimate?.stickerPrice}
        serviceType={serviceType}
      />

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">{"STYLE & THEME"}</PageP>
          <PageP styleName="description">
            What ideas do you have for the overall style and theme of your
            website? For example, modern and minimalist, bold and colorful, or
            muted and masculine. Describe the vibe and personality you have in
            mind. For example: friendly, approachable, upscale, exclusive,
            high-tech, handcrafted.
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
            Are there other websites you would like our designers to draw
            inspiration from? List websites you like and describe what you like
            about them.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          {_.map(_.get(formData, "inspiration", []), (entry, index) => (
            <div key={index}>
              {index ? (
                <div
                  role="button"
                  tabIndex="0"
                  styleName="remove-website"
                  onClick={() => removeWebsite(index)}
                >
                  Remove Website
                </div>
              ) : null}
              <FormField label={"Website Address (optional)"}>
                <FormInputText
                  placeholder={"Enter website url. e.g. www.acme.com"}
                  value={entry.website.value}
                  name="website"
                  onChange={(e) =>
                    handleArrayInputChange(
                      index,
                      "inspiration",
                      e.target.name,
                      e.target.value
                    )
                  }
                />
              </FormField>
              <FormField label={"What Do You Like (optional)"}>
                <FormInputTextArea
                  value={entry.feedback.value}
                  onChange={(e) =>
                    handleArrayInputChange(
                      index,
                      "inspiration",
                      e.target.name,
                      e.target.value
                    )
                  }
                  styleName={"text-area"}
                  name="feedback"
                  placeholder={"Describe what you like about this website"}
                />
              </FormField>
            </div>
          ))}
          <Button
            type={BUTTON_TYPE.SECONDARY}
            size={BUTTON_SIZE.MEDIUM}
            onClick={addWebsite}
          >
            ADD ANOTHER WEBSITE
          </Button>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">COLORS</PageP>
          <PageP styleName="description">
            Pick up to three colors you'd like our designers to use. You can
            also include your specific brand colors.
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
          <FormField
            label={`I Have Specific Colors ${
              selectedColor?.value?.length > 0 ? "(optional)" : ""
            }`}
          >
            <FormInputTextArea
              placeholder={
                "Specify colors using their value in RGB, CMYK, or Hex"
              }
              value={formData?.specificColor?.value}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              styleName={"text-area"}
              name="specificColor"
            />
          </FormField>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">FONTS</PageP>
          <PageP styleName="description">
            Choose your general font style preference. If you have specific
            fonts that should be used, please share them.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <FontOptions
            selectedFont={selectedFont}
            onSelect={(index, fontName) => {
              if (selectedFont === index) {
                handleInputChange("fontOption", null, null);
              } else {
                setSelectedFont(index);
                handleInputChange("fontOption", index, fontName);
              }
            }}
          />

          <div styleName="uploadFonts">
            <p>
              I have specific fonts I want to use.
              <br />
              Share a link to your publicly accessible fonts via drive, dropbox,
              etc.
            </p>
            <FormField
              label={`Shareable Font URL ${
                _.isNull(selectedFont) ? "" : "(Optional)"
              }`}
            >
              <FormInputText
                placeholder={"www.example-share-link.com"}
                value={formData?.fontUrl?.value}
                name="fontUrl"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </FormField>
            <FormField
              label={`How to Use Your Fonts ${
                _.isNull(selectedFont) ? "" : "(Optional)"
              }`}
            >
              <FormInputTextArea
                placeholder={
                  "Describe in detail how you would like our designers to use your fonts"
                }
                value={formData?.fontUsageDescription?.value}
                styleName={"text-area"}
                name="fontUsageDescription"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </FormField>
          </div>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Other Assets (optional)</PageP>
          <PageP styleName="description">
            Do you have any additional assets that would be helpful to our
            designers? For example, your current logo, branding direction,
            photos, illustrations, content, layout ideas, etc.
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <div styleName="assets">
            <p>
              Share a link to your publicly accessible assets via drive,
              dropbox, etc.
            </p>
            <FormField label={"Shareable Assets URL (Optional)"}>
              <FormInputText
                placeholder={"www.example-share-link.com"}
                value={formData?.assetsUrl?.value}
                name="assetsUrl"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
            </FormField>
          </div>
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Anything to avoid? (optional)</PageP>
          <PageP styleName="description">
            If there are any themes, ideas, or specific directions our designers
            should avoid, please let us know. Be as descriptive as possible.
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
            ​​There may be additional costs for designs that use stock images.
            Our designers will include details for any stock images used, so you
            can buy them at the end of the project.{" "}
            <span
              role="button"
              tabIndex={0}
              styleName="link"
              onClick={() => setIsPolicyModalOpen(true)}
            >
              Learn more about our stock photo policy
            </span>
            .
          </PageP>
        </div>

        <div styleName="formFieldWrapper">
          <RadioButton
            onChange={(items) => {
              const selectedOption = items.findIndex((item) => item.value);
              const foundOption = items.find((item) => item.value);
              handleInputChange(
                "allowStockOption",
                selectedOption,
                foundOption.label
              );
            }}
            size="lg"
            options={allowStockOption}
          />
        </div>
      </PageRow>

      <PageDivider />
      <PageRow styleName="form-row">
        <div>
          <PageP styleName="title">Final Deliverable SOURCE FILES</PageP>
          <PageP styleName="description">
            If you want your final deliverables created with a specific design
            software, please specify.{" "}
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

          {formData.selectedDeliverableOption?.value === 4 && (
            <div styleName="customDeliverable">
              <FormField label={"Desired Deliverable Format"}>
                <FormInputText
                  placeholder={"Describe your desired deliverable format file"}
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
  estimate: PT.shape().isRequired,
  price: PT.string,
  serviceType: PT.string,
  formData: PT.shape(),
  setFormData: PT.func,
};

export default BrandingForm;
