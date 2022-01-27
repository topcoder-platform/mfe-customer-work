import { navigate } from "@reach/router";
import React, { useEffect, useState, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { triggerAutoSave } from "../../actions/autoSave";
import { 
  saveWorkType,
  updatePrice,
  toggleSupportModal,
  createNewSupportTicket,
  resetIntakeForm
} from "../../actions/form";
import { setProgressItem } from "../../actions/progress";
import {
  clearAutoSavedForm,
  clearCachedChallengeId,
  setCookie,
} from "../../autoSaveBeforeLogin";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import IconWebsiteTools from "../../assets/images/design-tools.svg";
import Button from "../../components/Button";
import HelpBanner from "../../components/HelpBanner";
import SupportModal from "../../components/Modal/SupportModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import Page from "../../components/Page";
import PageContent from "../../components/PageContent";
import PageDivider from "../../components/PageDivider";
import PageFoot from "../../components/PageElements/PageFoot";
import PageH2 from "../../components/PageElements/PageH2";
import { BUTTON_SIZE, BUTTON_TYPE, HELP_BANNER, ROUTES, MAX_COMPLETED_STEP, webWorkTypes } from "../../constants/";
import { getProfile } from "../../selectors/profile";
import { getUserProfile } from "../../thunks/profile";

import styles from "./styles.module.scss";

/**
 * Select Work Type Page
 */
const SelectWorkType = ({ 
  saveWorkType,
  updatePrice, 
  setProgressItem,
  toggleSupportModal,
  createNewSupportTicket,
}) => {
  const dispatch = useDispatch();
  const [selectInitiated, setSelectInit] = useState(false);
  const workType = useSelector((state) => state.form.workType);
  const [isLoading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(workType?.workTypeStep || 0);
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedWorkTypeDetail, setSelectedWorkTypeDetail] = useState("");
  const showSupportModal = useSelector((state) => state.form.showSupportModal);
  const profileData = useSelector(getProfile);

  useEffect(() => {
    setProgressItem(1);
    setSelectInit(true);

    return () => {
      saveWorkType({ workTypeStep: currentStep });
      dispatch(triggerAutoSave(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (workType?.workTypeStep !== undefined) {
      setCurrentStep(workType.workTypeStep);
    }
    if (workType?.selectedWorkType) {
      setSelectedWorkType(workType.selectedWorkType);
    }
    if (workType?.selectedWorkTypeDetail) {
      setSelectedWorkTypeDetail(workType.selectedWorkTypeDetail);
    }
  }, [workType]);

  const handleClick = (selectedItem) => {
    if (!currentStep) {
      setCurrentStep(1);
      setSelectedWorkType(selectedItem?.title);
      saveWorkType({
        workTypeStep: 1,
        selectedWorkType: selectedItem?.title,
      });
      dispatch(triggerAutoSave(true));
    } else {
      setSelectedWorkTypeDetail(selectedItem?.title);
      saveWorkType({
        selectedWorkType,
        selectedWorkTypeDetail: selectedItem?.title,
      });
      updatePrice(selectedItem?.price);
      setProgressItem(2);
      navigate(`/self-service/basic-info`);
    }
  };

  const onBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
      setSelectedWorkTypeDetail("");
    } else {
      navigate(`/self-service`);
    }
    setProgressItem(1);
    saveWorkType({ workTypeStep: 0 });
    dispatch(triggerAutoSave(true));
  };

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

  const onStartWork = useCallback(() => {
    console.debug('starting work')
    setCookie(MAX_COMPLETED_STEP, "", -1);
    clearCachedChallengeId();
    clearAutoSavedForm();
    dispatch(resetIntakeForm(true));
    navigate(ROUTES.INTAKE_FORM);
  }, []);

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
        <PageContent>
          <PageH2>SELECT WORK TYPE</PageH2>

          <div className={styles.heroContainer}>

            <div className={styles.heroBackgroundContainer}></div>

            <div className={styles.heroContent}>
              <div className={styles.heroHeader}>
                <div className={styles.heroIconContainer}>
                  <IconWebsiteTools />
                </div>
                <div className={styles.heroHeaderContent}>
                  <div>website design</div>
                  <div className={styles.heroHeaderSubtitle}>starting at $630 | 5–7 Days</div>
                </div>
              </div>
              <div className={styles.heroText}>
                ​​Create a beautiful custom visual design for your website. 
                Specify the scope and device types, your vision, and receive 
                up to 5 modern designs.
              </div>              
              <div className={styles.heroButtonContainer}>
                <Button
                    onClick={onStartWork}
                    size={BUTTON_SIZE.MEDIUM}
                    type='secondary'
                  >
                    START WORK
                  </Button>
              </div>
            </div>

          </div>

          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <div className={styles.smallHeader}>Coming Soon</div>
              <div className={styles.title}>Website Development</div>
              <div className={styles.text}>
                  Our developers can bring your website designs to life! 
                  We'll get your website ready for the world to see. 
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.smallHeader}>Coming Soon</div>
              <div className={styles.title}>Data Sciene &amp; AI</div>
              <div className={styles.text}>
                Data Mining &amp; Analysis will empower you to reach your goals faster. 
                Tap data science geniuses from our pool of experts. 
              </div>
            </div>
          </div>

          <HelpBanner
            title={HELP_BANNER.title}
            description={HELP_BANNER.description}
            contactSupport={onShowSupportModal}
          />

          <PageDivider />

          <PageFoot>
            <div className={styles.backButtonContainer}>
              <Button
                size={BUTTON_SIZE.MEDIUM}
                type={BUTTON_TYPE.SECONDARY}
                onClick={onBack}
              >
                <div className={styles.backButtonWrapper}>
                  <BackIcon />
                </div>
              </Button>
            </div>
          </PageFoot>

        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  saveWorkType,
  updatePrice,
  setProgressItem,
  toggleSupportModal,
  createNewSupportTicket,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectWorkType);
