import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import _ from "lodash";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageFoot from "components/PageElements/PageFoot";
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  PageOptions,
  PrimaryDataChallengeOptions,
} from "constants/";
import {
  saveBasicInfo,
  toggleSupportModal,
  savePageDetails,
  saveWorkType,
} from "../../../../actions/form";
import { triggerAutoSave } from "../../../../actions/autoSave";
import { setProgressItem } from "../../../../actions/progress";
import BackIcon from "../../../../assets/images/icon-back-arrow.svg";
import SaveForLaterIcon from "../../../../assets/images/save-for-later-icon.svg";
import ArrowRightIcon from "../../../../assets/images/icon-arrow.svg";
import { getUserProfile } from "../../../../thunks/profile";

import BasicInfoForm from "../BasicInfoForm";
import "./styles.module.scss";
import {
  getDynamicPriceAndTimeline,
  getDynamicPriceAndTimelineEstimate,
  getDataAdvisoryPriceAndTimelineEstimate,
  currencyFormat,
  getDataExplorationPriceAndTimelineEstimate,
  getFindMeDataPriceAndTimelineEstimate,
  getWebsiteDesignPriceAndTimelineEstimate,
} from "utils/";
import FeaturedWorkTypeBanner from "../../../../components/Banners/FeaturedWorkTypeBanner";

import { ContactSupportModal } from "../../../../../src-ts";

/**
 * Basic Info Page
 */
const BasicInfo = ({
  saveBasicInfo,
  saveWorkType,
  setProgressItem,
  toggleSupportModal,
  bannerData,
  isLoggedIn,
}) => {
  const defaultFormData = {
    projectTitle: { title: "Project Title", option: "", value: "" },
    description: { title: "Description", option: "", value: "" },
    assetsUrl: { title: "Shareable URL Link(s)", value: "" },
    assetsDescription: { title: "About Your Assets", value: "" },
    goals: { title: "Goals & Data Description", option: "", value: null },
    analysis: { title: "What Data Do You Need?", option: "", value: "" },
    feedback: { title: "What Data Do You like?", option: "", value: "" },
    yourIndustry: { title: "Your Industry", option: "", value: "" },
    colorOption: { title: "Color Option", value: [], option: [] },
    likedStyles: { title: "Liked Styles", value: [], option: [] },
    dislikedStyles: { title: "Disliked Styles", value: [], option: [] },
    specificColor: { title: "Custom Color", option: "", value: "" },
    primaryDataChallenge: {
      title: "Primary Data Challenge",
      option: PrimaryDataChallengeOptions[0].label,
      value: 0,
    },
    primaryDataChallengeOther: {
      title: "Primary Data Challenge (Other Option)",
      option: "",
      value: "",
    },
    inspiration: [
      {
        website: { title: "Website Address", value: "", option: "" },
        feedback: { title: "What Do You Like", value: "", option: "" },
      },
    ],
    sampleData: { title: "Sample Data", option: "", value: "" },
  };

  const [formData, setFormData] = useState(defaultFormData);
  const isFindMeData = bannerData.title === "Find Me Data";
  const isWebsiteDesign = bannerData.title === "Website Design";
  const isWebsiteDesignFormValid = formData?.projectTitle?.value?.trim().length;
  const isDataExploration = bannerData.title === "Data Exploration";
  const isDataAdvisory =
    bannerData.title === "Problem Statement & Data Advisory";
  const isDataExplorationFormValid =
    formData?.projectTitle?.value?.trim().length &&
    formData?.goals?.value?.trim().length;
  const isDataAdvisoryFormValid =
    formData?.projectTitle?.value?.trim().length &&
    formData?.goals?.value?.trim().length;
  const isFindMeDataFormValid =
    formData?.projectTitle?.value?.trim().length &&
    formData?.analysis?.value?.trim().length &&
    ((formData?.primaryDataChallenge?.value >= 0 &&
      formData?.primaryDataChallenge?.value < 3) ||
      (formData?.primaryDataChallenge?.value === 3 &&
        formData?.primaryDataChallengeOther?.value?.trim().length)) &&
    formData?.sampleData?.value?.trim().length;
  // const isFormValid = isDataExploration
  //   ? isDataExplorationFormValid
  //   : isFindMeDataFormValid;

  let isFormValid;
  if (isDataExploration) {
    isFormValid = isDataExplorationFormValid;
  } else if (isFindMeData) {
    isFormValid = isFindMeDataFormValid;
  } else if (isWebsiteDesign) {
    isFormValid = isWebsiteDesignFormValid;
  } else if (isDataAdvisory) {
    isFormValid = isDataAdvisoryFormValid;
  }

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const workType = useSelector((state) => state.form.workType);
  const basicInfo = useSelector((state) => state.form.basicInfo);
  const currentStep = useSelector((state) => state.progress.currentStep);
  const pageDetails = useSelector((state) => state.form.pageDetails);
  const showSupportModal = useSelector((state) => state.form.showSupportModal);
  const challenge = useSelector((state) => state.challenge);

  const estimate =
    workType?.selectedWorkType === "Website Design"
      ? getWebsiteDesignPriceAndTimelineEstimate()
      : isDataExploration
      ? getDataExplorationPriceAndTimelineEstimate()
      : isDataAdvisory
      ? getDataAdvisoryPriceAndTimelineEstimate()
      : getFindMeDataPriceAndTimelineEstimate();

  const onBack = () => {
    saveBasicInfo(defaultFormData);
    navigate("/self-service/wizard");
  };

  let basePath;
  if (isDataExploration) {
    basePath = "data-exploration";
  } else if (isFindMeData) {
    basePath = "find-me-data";
  } else if (isWebsiteDesign) {
    basePath = "website-design";
  } else if (isDataAdvisory) {
    basePath = "data-advisory";
  }

  const baseUrl = `/self-service/work/new/${basePath}`;

  const onNext = () => {
    setProgressItem(isLoggedIn ? 7 : 5);
    saveBasicInfo(formData);
    dispatch(triggerAutoSave(true));
    navigate(isLoggedIn ? `${baseUrl}/review` : `${baseUrl}/login-prompt`);
  };

  const [firstMounted, setFirstMounted] = useState(true);

  useEffect(() => {
    if (!firstMounted) {
      return;
    }

    setProgressItem(2);

    if (currentStep === 0) {
      saveWorkType({
        selectedWorkType: bannerData.title,
        selectedWorkTypeDetail: bannerData.title,
      });
      dispatch(triggerAutoSave(true));
    }

    if (basicInfo && basicInfo?.projectTitle?.value.length > 0) {
      setFormData(basicInfo);
    }

    setFirstMounted(false);

    return () => {
      dispatch(triggerAutoSave(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basicInfo, currentStep, dispatch, setProgressItem, firstMounted]);

  useEffect(() => {
    if (
      formData?.primaryDataChallenge?.value !== 3 &&
      formData?.primaryDataChallengeOther?.value?.trim().length > 0
    ) {
      setFormData({
        ...formData,
        primaryDataChallengeOther: {
          ...formData["primaryDataChallengeOther"],
          option: "",
          value: "",
        },
      });
    } else {
      if (formData) {
        saveBasicInfo(formData);
      }
    }
  }, [formData, formData.selectedDevices, saveBasicInfo]);

  const onShowSupportModal = () => {
    toggleSupportModal(true);
  };
  const onHideSupportModal = () => {
    toggleSupportModal(false);
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const saveForm = (redirect) => {
    saveBasicInfo(formData);
    dispatch(triggerAutoSave(true));
    if (redirect) navigate("/self-service");
  };

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <ContactSupportModal
        challengeId={challenge?.id}
        isOpen={showSupportModal}
        onClose={onHideSupportModal}
      />
      <Page>
        <FeaturedWorkTypeBanner
          title={bannerData.title}
          subTitle={bannerData.subTitle}
        />
        <PageContent styleName="container">
          <BasicInfoForm
            pageListOptions={_.map(PageOptions, (o, i) => ({
              ...o,
              value: i === (pageDetails?.pages?.length || 0) - 1,
              label: `${o.label} (${currencyFormat(
                getDynamicPriceAndTimeline(
                  i + 1,
                  formData?.selectedDevice?.value?.length || 0
                ).total
              )})`,
            }))}
            estimate={estimate}
            formData={formData}
            serviceType={workType?.selectedWorkTypeDetail}
            onFormUpdate={setFormData}
            numOfPages={pageDetails?.pages?.length || 0}
            onShowSupportModal={onShowSupportModal}
            bannerData={bannerData}
            saveForm={saveForm}
          />

          <PageDivider />
          <PageFoot>
            <div styleName="footerContent">
              <div>
                <Button
                  size={BUTTON_SIZE.MEDIUM}
                  type={BUTTON_TYPE.SECONDARY}
                  onClick={onBack}
                >
                  <div styleName="backButtonWrapper">
                    <BackIcon />
                  </div>
                </Button>
              </div>
              <div styleName="footer-right">
                {isLoggedIn && (
                  <Button
                    disabled={!isFormValid}
                    size={BUTTON_SIZE.MEDIUM}
                    type={BUTTON_TYPE.SECONDARY}
                    onClick={() => saveForm(true)}
                  >
                    <SaveForLaterIcon styleName="save-icon" />
                    <span styleName="save-button-text">SAVE FOR LATER</span>
                  </Button>
                )}
                <Button
                  disabled={!isFormValid}
                  size={BUTTON_SIZE.MEDIUM}
                  onClick={onNext}
                >
                  <ArrowRightIcon styleName="rotated" />
                  <span styleName="review-button-text">REVIEW &amp; SUBMIT</span>
                </Button>
              </div>
            </div>
          </PageFoot>
        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  saveBasicInfo,
  setProgressItem,
  savePageDetails,
  toggleSupportModal,
  saveWorkType,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
