import { navigate } from "@reach/router";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageH2 from "components/PageElements/PageH2";
import PageP from "components/PageElements/PageP";
import TabSelector from "components/TabSelector";
import { BUTTON_SIZE, BUTTON_TYPE, webWorkTypes, workTypes } from "constants/";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { triggerAutoSave } from "../../actions/autoSave";
import { saveWorkType, updatePrice } from "../../actions/form";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import "./styles.module.scss";

/**
 * Select Work Type Page
 */
const SelectWorkType = ({ saveWorkType, updatePrice, setProgressItem }) => {
  const dispatch = useDispatch();
  const [selectInitiated, setSelectInit] = useState(false);
  const workType = useSelector((state) => state.form.workType);
  const [isLoading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(workType?.workTypeStep || 0);
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [selectedWorkTypeDetail, setSelectedWorkTypeDetail] = useState("");

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

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>SELECT WORK TYPE</PageH2>
          <PageDivider />

          {currentStep === 0 && selectInitiated && (
            <TabSelector
              items={workTypes}
              handleClick={handleClick}
              selectedState={workType?.selectedWorkType}
            />
          )}
          {currentStep === 1 && (
            <div styleName="tabSelectorWrapper">
              <div
                styleName="backButton"
                onClick={onBack}
                role="button"
                tabIndex={0}
              >
                <Button size={BUTTON_SIZE.SMALL} type={BUTTON_TYPE.ROUNDED}>
                  <BackIcon />
                </Button>
                <span>{selectedWorkType}</span>
              </div>
              <TabSelector
                items={webWorkTypes}
                handleClick={handleClick}
                selectedState={workType?.selectedWorkTypeDetail}
              />
            </div>
          )}
          <PageDivider />
          <PageP styleName="bold">Looking For Something Else?</PageP>
          <PageP styleName="description">
            Topcoder also offers solutions for multiple other technical needs
            and problems. We have community members expertly skilled in the
            areas of UI/UX Design, Data Science, Quality Assurance, and more.
            We'd love to talk with you about all of our services.
          </PageP>

          {currentStep === 0 && (
            <div styleName="footer">
              <Button size={BUTTON_SIZE.MEDIUM} type={BUTTON_TYPE.SECONDARY}>
                <div
                  role="button"
                  tabIndex={0}
                  styleName="backButtonWrapper"
                  onClick={onBack}
                >
                  <BackIcon />
                </div>
              </Button>
            </div>
          )}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectWorkType);
