import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { navigate, redirectTo } from "@reach/router";
import _ from "lodash";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageFoot from "components/PageElements/PageFoot";
import PageH2 from "components/PageElements/PageH2";
import Progress from "components/Progress";
import { IconWebsiteTools } from "../../assets/images/design-tools.svg"
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  DeviceOptions,
  PageOptions,
} from "constants/";
import {
  saveBasicInfo,
  toggleSupportModal,
  createNewSupportTicket,
  savePageDetails,
} from "../../actions/form";
import { triggerAutoSave } from "../../actions/autoSave";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import SupportModal from "../../components/Modal/SupportModal";
import { getProfile } from "../../selectors/profile";
import { getUserProfile } from "../../thunks/profile";

import BasicInfoForm from "./components/BasicInfoForm";
import "./styles.module.scss";
import {
  getDynamicPriceAndTimeline,
  getDynamicPriceAndTimelineEstimate,
  currencyFormat,
} from "utils/";

/**
 * Basic Info Page
 */
const BasicInfo = ({
  saveBasicInfo,
  setProgressItem,
  savePageDetails,
  toggleSupportModal,
  createNewSupportTicket,
}) => {
  const [formData, setFormData] = useState({
    projectTitle: { title: "Project Title", option: "", value: "" },
    numberOfPages: { title: "How Many Pages?", option: "", value: "" },
    selectedDevice: {
      title: "Device Types",
      option: ["Computer"],
      value: [0],
    },
  });
  const isFormValid = formData?.projectTitle?.value.length;
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
  const estimate = getDynamicPriceAndTimelineEstimate(fullState);

  const onBack = () => {
    // This is a temporary hack to get the customer directly into the landing page
    // when clicking the back button instead of the product catalog page
    navigate("/self-service");
  };

  const onNext = () => {
    setProgressItem(3);
    saveBasicInfo(formData);
    navigate("/self-service/website-purpose");
  };

  const updateNumOfPages = (newNumOfPages) => {
    let newPages = pageDetails?.pages || [];
    if (newNumOfPages < newPages.length) {
      newPages.length = newNumOfPages;
    } else if (newNumOfPages !== newPages.length) {
      for (let i = newPages.length; i < newNumOfPages; i += 1) {
        newPages.push({
          pageName: "",
          pageDetails: "",
        });
      }
    }

    savePageDetails({
      ...pageDetails,
      pages: newPages,
    });
    setFormData({
      ...formData,
      numberOfPages: {
        title: "How Many Pages?",
        option: newNumOfPages === 1 ? "1 Screen" : `${newNumOfPages} Screens`,
        value: newNumOfPages === 1 ? "1 Screen" : `${newNumOfPages} Screens`,
      },
    });
  };

  const [firstMounted, setFirstMounted] = useState(true);

  useEffect(() => {
    if (!firstMounted) {
      return;
    }

    setProgressItem(2);

    if (currentStep === 0) {
      redirectTo("/self-service/wizard");
    }

    if (basicInfo && basicInfo?.projectTitle?.value.length > 0) {
      setFormData(basicInfo);
    }

    setFirstMounted(true);

    return () => {
      dispatch(triggerAutoSave(true));
    };
  }, [basicInfo, currentStep, dispatch, setProgressItem, firstMounted]);

  useEffect(() => {
    if (formData) {
      saveBasicInfo(formData);
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
        <div styleName="heroContainer">
          <div styleName="heroBackgroundContainer"></div>
            <div styleName="heroContent">
              <div styleName="heroHeader">
                <div styleName="heroHeaderContent">
                  <div styleName="heroHeaderTitle">
                    <div styleName="heroIconContainer">
                      <IconWebsiteTools />
                    </div>
                    WEBSITE DESIGN
                  </div>
                  <div styleName="heroHeaderSubtitle">Create a beautiful custom visual design for your website.
                Specify the scope and device types, your vision, and receive up to 5 modern designs.
                  </div>
              </div>
            </div>
          </div>
        </div>
        <PageContent styleName="container">
          <PageH2>BASIC INFO</PageH2>
          <PageDivider />

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
            updateNumOfPages={updateNumOfPages}
            onShowSupportModal={onShowSupportModal}
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
                  NEXT
                </Button>
              </div>
            </div>
          </PageFoot>

          <Progress level={2} setStep={setProgressItem} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
