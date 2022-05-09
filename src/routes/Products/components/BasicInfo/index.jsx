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
import { BUTTON_SIZE, BUTTON_TYPE, PageOptions } from "constants/";
import {
  saveBasicInfo,
  toggleSupportModal,
  createNewSupportTicket,
  savePageDetails,
  saveWorkType,
} from "../../../../actions/form";
import { triggerAutoSave } from "../../../../actions/autoSave";
import { setProgressItem } from "../../../../actions/progress";
import BackIcon from "../../../../assets/images/icon-back-arrow.svg";
import SupportModal from "../../../../components/Modal/SupportModal";
import { getProfile } from "../../../../selectors/profile";
import { getUserProfile } from "../../../../thunks/profile";

import BasicInfoForm from "../BasicInfoForm";
import "./styles.module.scss";
import {
  getDynamicPriceAndTimeline,
  getDynamicPriceAndTimelineEstimate,
  currencyFormat,
  getDataExplorationPriceAndTimelineEstimate,
  getFindMeDataPriceAndTimelineEstimate,
} from "utils/";
import FeaturedWorkTypeBanner from "../../../../components/Banners/FeaturedWorkTypeBanner";

/**
 * Basic Info Page
 */
const BasicInfo = ({
  saveBasicInfo,
  saveWorkType,
  setProgressItem,
  toggleSupportModal,
  createNewSupportTicket,
  bannerData,
  isLoggedIn,
}) => {
  const [formData, setFormData] = useState({
    projectTitle: { title: "Project Title", option: "", value: "" },
    findMeProjectTitle: { title: "Project Title", option: "", value: "" },
    assetsUrl: { title: "Shareable URL Link(s)", value: "" },
    goals: { title: "Goals & Data Description", option: "", value: null },
    analysis: { title: "What Data Do You Need?", option: "", value: "" },
    primaryDataChallenge: {
      title: "Primary Data Challenge",
      option: "",
      value: "",
    },
    primaryDataChallengeOther: {
      title: "Primary Data Challenge (Other Option)",
      option: "",
      value: "",
    },
    sampleData: { title: "Sample Data", option: "", value: "" },
  });
  const isDataExploration = bannerData.title === "Data Exploration";
  const isDataExplorationFormValid =
    formData?.projectTitle?.value?.trim().length &&
    formData?.goals?.value?.trim().length;
  const isFindMeDataFormValid =
    formData?.findMeProjectTitle?.value?.trim().length &&
    formData?.analysis?.value?.trim().length &&
    ((formData?.primaryDataChallenge?.value >= 0 &&
      formData?.primaryDataChallenge?.value < 3) ||
      (formData?.primaryDataChallenge?.value === 3 &&
        formData?.primaryDataChallengeOther?.value?.trim().length)) &&
    formData?.sampleData?.value?.trim().length;
  const isFormValid = isDataExploration
    ? isDataExplorationFormValid
    : isFindMeDataFormValid;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const workType = useSelector((state) => state.form.workType);
  const basicInfo = useSelector((state) => state.form.basicInfo);
  const currentStep = useSelector((state) => state.progress.currentStep);
  const pageDetails = useSelector((state) => state.form.pageDetails);
  const showSupportModal = useSelector((state) => state.form.showSupportModal);
  const profileData = useSelector(getProfile);
  const challenge = useSelector((state) => state.challenge);
  const fullState = useSelector((state) => state);

  const estimate =
    workType === "Website Design"
      ? getDynamicPriceAndTimelineEstimate(fullState)
      : isDataExploration
      ? getDataExplorationPriceAndTimelineEstimate()
      : getFindMeDataPriceAndTimelineEstimate();

  const onBack = () => {
    navigate("/self-service/wizard");
  };

  const baseUrl = `/self-service/work/new/${
    isDataExploration ? "data-exploration" : "find-me-data"
  }`;

  const onNext = () => {
    setProgressItem(isLoggedIn ? 7 : 5);
    saveBasicInfo(formData);
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

    if (
      basicInfo &&
      (basicInfo?.projectTitle?.value.length > 0 ||
        basicInfo?.findMeProjectTitle?.value.length > 0)
    ) {
      setFormData(basicInfo);
    }

    setFirstMounted(true);

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

  const onSubmitSupportRequest = (submittedSupportRequest) =>
    createNewSupportTicket(
      submittedSupportRequest,
      challenge?.id,
      challenge?.legacy?.selfService
    );

  return (
    <>
      <LoadingSpinner show={isLoading} />
      {showSupportModal && (
        <SupportModal
          profileData={profileData}
          handleClose={onHideSupportModal}
          onSubmit={onSubmitSupportRequest}
        ></SupportModal>
      )}
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
                <Button
                  disabled={!isFormValid}
                  size={BUTTON_SIZE.MEDIUM}
                  onClick={onNext}
                >
                  REVIEW &amp; SUBMIT
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
  createNewSupportTicket,
  saveWorkType,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
