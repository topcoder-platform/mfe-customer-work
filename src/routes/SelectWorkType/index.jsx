import { navigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { triggerAutoSave } from "../../actions/autoSave";
import { saveWorkType, updatePrice, toggleSupportModal, createNewSupportTicket } from "../../actions/form";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import Button from "../../components/Button";
import HelpBanner from "../../components/HelpBanner";
import SupportModal from "../../components/Modal/SupportModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import Page from "../../components/Page";
import PageContent from "../../components/PageContent";
import PageDivider from "../../components/PageDivider";
import PageFoot from "../../components/PageElements/PageFoot";
import PageH2 from "../../components/PageElements/PageH2";
import { BUTTON_SIZE, BUTTON_TYPE, HELP_BANNER, webWorkTypes, workTypes } from "constants/";
import { getProfile } from "../../selectors/profile";
import { getUserProfile } from "../../thunks/profile";

import "./styles.module.scss";

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


          <PageDivider />

          <HelpBanner
            title={HELP_BANNER.title}
            description={HELP_BANNER.description}
            contactSupport={onShowSupportModal}
          />

          <PageFoot>
            <div styleName="backButtonContainer">
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
