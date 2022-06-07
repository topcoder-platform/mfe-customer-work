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
import WebsiteDesignIcon from "../../../../assets/images/website-design-icon.svg";
import AddWebsiteIcon from "../../../../assets/images/add-website-icon.svg";
import StylesOptionsModal from "../StyleOptionsModal";
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

  let servicePriceIcon;
  switch (title) {
    case "Data Exploration":
    case "Problem Statement & Data Advisory":
      servicePriceIcon = <DataExplorationIcon />;
      break;
    case "Find Me Data":
      servicePriceIcon = <FindMeDataIcon />;
      break;
    case "Website Design":
      servicePriceIcon = <WebsiteDesignIcon />;
      break;
    default:
      break;
  }

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
              value={formData.projectTitle.value}
              name={"projectTitle"}
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

      {isDataAdvisory && (
        <PageRow styleName="form-row">
          <div>
            <PageP styleName="title">What data do you have?</PageP>
            <PageP styleName="description">
              The data you have available helps determine your data science
              approach. Briefly describe the data you have in mind for your
              project. What is it and how do you use it today? How much do you
              have, and how/how often do you get more? Once you've described the
              data, please upload a sample.
              <br />
              <div styleName="helpText">
                No data?&nbsp;
                <HelpIcon>
                  No problem. Based on your goals we'll recommend the type(s) of
                  data you need.
                </HelpIcon>
              </div>
              <div styleName="helpText">
                Can't share/upload?&nbsp;
                <HelpIcon>
                  Try sharing a sample. Samples can be just the headers, labels
                  or titles of your data set. Our experts need to understand the
                  type, volume and structure of your data, not the contents
                  themselves.
                </HelpIcon>
              </div>
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
            <FormField label={"Data Description"}>
              <FormInputTextArea
                value={formData?.assetsDescription?.value}
                onChange={(e) =>
                  handleInputChange(
                    e.target.name,
                    e.target.value,
                    e.target.value
                  )
                }
                styleName={"text-area"}
                name="assetsDescription"
                placeholder={"Describe your data"}
              />
            </FormField>
          </div>
        </PageRow>
      )}

      {isFindMeData && <PageDivider />}

      {isWebsiteDesign && (
        <PageRow styleName="form-row">
          <div>
            <PageP styleName="title">inspiration</PageP>
            <PageP styleName="description">
              Are there websites that you love, from which our designers may
              draw inspiration? Share the website URLs and tell us what you like
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
            <button styleName="addWebsiteButton" onClick={addWebsite}>
              {" "}
              <AddWebsiteIcon />
              Add Another Website
            </button>
          </div>
        </PageRow>
      )}
      {isWebsiteDesign && <PageDivider />}
      {isWebsiteDesign && (
        <PageRow styleName="form-row">
          <PageP styleName="title">STYLE &amp; THEME</PageP>
        </PageRow>
      )}
      {isWebsiteDesign && (
        <PageRow styleName="form-row">
          <div styleName="formFieldWrapper style-picker">
            <PageP styleName="label">
              Let us know the visual styles you like or dislike (optional):
            </PageP>
            <div styleName="styles">
              <StyleOptions
                likes={formData?.likedStyles?.value}
                dislikes={formData?.dislikedStyles?.value}
                onSelect={(style) => setSelectedStyleOption(style)}
                onLike={(likes) => {
                  handleInputChange("likedStyles", likes, likes);
                }}
                onDislike={(dislikes) => {
                  handleInputChange("dislikedStyles", dislikes, dislikes);
                }}
              />
            </div>
            <PageRow styleName="form-row">
              <div>
                <PageP styleName="label">
                  Additional details about your look & feel preferences:
                </PageP>
              </div>
              <div styleName="formFieldWrapper">
                <FormField label={`Style Preferences (optional)`}>
                  <FormInputTextArea
                    value={formData?.stylePreferences?.value}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    styleName={"text-area"}
                    name="stylePreferences"
                    placeholder={"Describe your ideal look & feel"}
                  />
                </FormField>
              </div>
            </PageRow>
          </div>
        </PageRow>
      )}
      {isWebsiteDesign && selectedStyleOption && (
        <StylesOptionsModal
          style={selectedStyleOption}
          likes={formData?.likedStyles?.value}
          dislikes={formData?.dislikedStyles?.value}
          onLike={(likes) => {
            handleInputChange("likedStyles", likes, likes);
          }}
          onDislike={(dislikes) => {
            handleInputChange("dislikedStyles", dislikes, dislikes);
          }}
          onDismiss={() => setSelectedStyleOption(null)}
        />
      )}

      {isWebsiteDesign && (
        <PageRow styleName="form-row">
          <div styleName="formFieldWrapper color-picker">
            <PageP styleName="label">
              Choose colors you would like our designers to use in your site
              design:
            </PageP>
            <div styleName="colors">
              <ColorOptions
                colors={ColorOptionsItems}
                selectedColor={selectedColor}
                onSelect={(index, colorName) => {
                  handleInputChange("colorOption", index, colorName);
                }}
              />
            </div>
            <PageRow styleName="form-row">
              <div>
                <PageP styleName="label">
                  List any specific colors you would like used in your design:
                </PageP>
              </div>
              <div styleName="formFieldWrapper">
                <FormField
                  label={`List Specific Colors ${selectedColor?.value?.length > 0 ? "(optional)" : ""
                    }`}
                >
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
              </div>
            </PageRow>
          </div>
        </PageRow>
      )}

      {isWebsiteDesign && ( <PageDivider /> )}

      {isWebsiteDesign && (
        <PageRow styleName="form-row">
          <div>
            <PageP styleName="title">share your brand or style assets</PageP>
            <PageP styleName="description">
              If you have them, gather and upload any assets that you think
              might be helpful for our designers. Let us know if there is
              anything you would like to communicate about these items. <br />
              Assets could be:
              <ul styleName="list">
                <li>your logo</li>
                <li>your brand guide</li>
                <li>mood boards</li>
                <li>font files</li>
                <li>sketches or other inspiration</li>
              </ul>
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
              <FormField label={"About Your Assets (optional)"}>
                <FormInputTextArea
                  value={formData?.assetsDescription?.value}
                  onChange={(e) =>
                    handleInputChange(
                      e.target.name,
                      e.target.value,
                      e.target.value
                    )
                  }
                  styleName={"text-area"}
                  name="assetsDescription"
                  placeholder={"Describe what you would like us to know"}
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
