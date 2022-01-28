import { navigate, redirectTo } from "@reach/router";
import Button from "components/Button";
import FormInputCheckbox from "components/FormElements/FormInputCheckbox";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageFoot from "components/PageElements/PageFoot";
import PageH2 from "components/PageElements/PageH2";
import Progress from "components/Progress";
import { BUTTON_SIZE, BUTTON_TYPE } from "constants/";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { triggerAutoSave } from "../../actions/autoSave";
import { reviewConfirmed } from "../../actions/form";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import ReviewTable from "./components/ReviewTable";
import ServicePrice from "components/ServicePrice";
import "./styles.module.scss";
import { getDynamicPriceAndTimelineEstimate } from "utils/";

/**
 * Review Page
 */
const Review = ({ setProgressItem }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const formData = useSelector((state) => state?.form);
  const [checked, setChecked] = useState(false);
  const currentStep = useSelector((state) => state?.progress.currentStep);
  const price = useSelector((state) => state.form.price);
  const additionalPrice = useSelector((state) => state.form.additionalPrice);
  const devicePrice = useSelector((state) => state.form.devicePrice);
  const pagePrice = useSelector((state) => state.form.pagePrice);
  const total = price + additionalPrice + devicePrice + pagePrice;
  const workType = useSelector((state) => state.form.workType);
  const fullState = useSelector((state) => state);
  const estimate = getDynamicPriceAndTimelineEstimate(fullState);

  const [firstMounted, setFirstMounted] = useState(true);
  useEffect(() => {
    if (!firstMounted) {
      return;
    }

    setProgressItem(6);

    if (currentStep === 0) {
      redirectTo("/self-service");
    }

    if (formData?.reviewConfirmed) {
      setChecked(true);
    }

    setFirstMounted(false);

    return () => {
      dispatch(triggerAutoSave(true));
    };
  }, [currentStep, formData, dispatch, setProgressItem, firstMounted]);

  const [anotherFirstMounted, setAnotherFirstMounted] = useState(true);
  useEffect(() => {
    if (!anotherFirstMounted) {
      return;
    }

    if (currentStep === 0) {
      redirectTo("/self-service");
    }

    setAnotherFirstMounted(false);
  }, [currentStep, anotherFirstMounted]);

  const onBack = () => {
    navigate("/self-service/branding");
  };

  const onNext = () => {
    navigate("/self-service/payment");
    setProgressItem(7);
  };

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>REVIEW</PageH2>
          <PageDivider />
          <ServicePrice
            price={estimate.total}
            duration={estimate.totalDuration}
            serviceType={workType?.selectedWorkTypeDetail}
          />
          <div styleName="infoAlert">
            Your Website Design project includes up to 5 unique Visual Design
            solutions. Each solution will match your specified scope and device
            types. You will receive industry-standard source files to take
            forward to further design and/or development. Design deliverables
            will NOT include functional code.
          </div>
          <PageDivider />
          <ReviewTable formData={formData} />

          <div styleName="confirmationBox">
            <strong>
              The details above accurately describe the work I want delivered.
            </strong>{" "}
            From this point forward, I understand that I cannot edit these
            requirements nor change the scope of the project.
            <br />
            <br />
            <FormInputCheckbox
              label={"Yes, I confirm the above details are correct"}
              checked={checked}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setChecked(isChecked);
                dispatch(reviewConfirmed(isChecked));
              }}
            />
          </div>
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
                  disabled={!checked}
                  size={BUTTON_SIZE.MEDIUM}
                  onClick={onNext}
                >
                  NEXT
                </Button>
              </div>
            </div>
          </PageFoot>

          <Progress level={6} setStep={setProgressItem} />
        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  setProgressItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
