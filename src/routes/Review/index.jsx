import { navigate, redirectTo } from "@reach/router";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import config from "../../../config";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Page from "components/Page";
import Modal from "components/Modal";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageFoot from "components/PageElements/PageFoot";
import { resetIntakeForm } from "../../actions/form";
import PageUl from "../../components/PageElements/PageUl";
import { toastr } from "react-redux-toastr";
import Progress from "components/Progress";
import { BUTTON_SIZE, BUTTON_TYPE, MAX_COMPLETED_STEP } from "constants/";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import FormInputCheckbox from "../../components/FormElements/FormInputCheckbox";
import PaymentForm from "./components/PaymentForm";
import { triggerAutoSave } from "../../actions/autoSave";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import ReviewTable from "./components/ReviewTable";
import withAuthentication from "../../hoc/withAuthentication";
import ServicePrice from "components/ServicePrice";
import * as services from "../../services/payment";
import { getUserProfile } from "../../thunks/profile";
import { activateChallenge } from "../../services/challenge";
import "./styles.module.scss";
import {
  getDynamicPriceAndTimelineEstimate,
  getDataExplorationPriceAndTimelineEstimate,
  getFindMeDataPriceAndTimelineEstimate,
  currencyFormat,
} from "utils/";
import OrderContract from "../../components/Modal/OrderContract";
import _ from "lodash";
import {
  loadChallengeId,
  setCookie,
  clearCachedChallengeId,
} from "../../autoSaveBeforeLogin";
import HelpBanner from "components/HelpBanner";

const stripePromise = loadStripe(config.STRIPE.API_KEY, {
  apiVersion: config.STRIPE.API_VERSION,
});

/**
 * Review Page
 */
const Review = ({
  setProgressItem,
  previousPageUrl,
  nextPageUrl,
  showProgress,
  introText,
  banner,
  icon,
  showIcon,
  enableEdit = true,
  secondaryBanner,
  bannerData,
}) => {
  const dispatch = useDispatch();
  const [paymentFailed, setPaymentFailed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const intakeFormData = useSelector((state) => state?.form);
  const [formData, setFormData] = useState({
    cardName: null,
    cardNumber: false, // value is bool indicating if it's valid or not
    country: null,
    cvc: false, // value is bool indicating if it's valid or not
    expiryDate: false, // value is bool indicating if it's valid or not
    zipCode: null,
  });
  const [checked, setChecked] = useState(false);
  const isDataExploration = bannerData.title === "Data Exploration";
  const currentStep = useSelector((state) => state?.progress.currentStep);
  const workType = useSelector((state) => state.form.workType);
  const stripe = useStripe();
  const elements = useElements();
  const fullState = useSelector((state) => state);
  const [isOrderContractModalOpen, setIsOrderContractModalOpen] =
    useState(false);
  const estimate =
    workType?.selectedWorkType === "Website Design"
      ? getDynamicPriceAndTimelineEstimate(fullState)
      : isDataExploration
      ? getDataExplorationPriceAndTimelineEstimate()
      : getFindMeDataPriceAndTimelineEstimate();

  const [firstMounted, setFirstMounted] = useState(true);
  useEffect(() => {
    if (!firstMounted) {
      return;
    }

    setProgressItem(7);

    if (currentStep === 0) {
      redirectTo("/self-service");
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
    navigate(previousPageUrl || "/self-service/branding");
  };

  const clearPreviousForm = () => {
    setCookie(MAX_COMPLETED_STEP, "", -1);
    clearCachedChallengeId();
    dispatch(resetIntakeForm(true));
  };

  const challengeId = loadChallengeId();
  const onNext = async () => {
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setPaymentFailed(false);

    const numOfPages = _.get(fullState, "form.pageDetails.pages.length", 1);
    const numOfDevices = _.get(
      fullState,
      "form.basicInfo.selectedDevice.option.length",
      1
    );
    const additionalPaymentInfo =
      workType?.selectedWorkType === "Website Design"
        ? `\n${numOfPages} Pages\n${numOfDevices} Devices`
        : "";

    const description = `Work Item #${challengeId}\n${_.get(
      fullState,
      "form.basicInfo.projectTitle.value",
      ""
    ).slice(0, 355)}\n${_.get(
      fullState,
      "form.workType.selectedWorkType"
    )}${additionalPaymentInfo}`;

    services
      .processPayment(
        stripe,
        elements,
        estimate.total,
        challengeId,
        formData.email,
        description
      )
      .then((res) => {
        activateChallenge(challengeId);
        clearPreviousForm();
        navigate(nextPageUrl || "/self-service/thank-you");
        setProgressItem(8);
        setPaymentFailed(false);
      })
      .catch(() => {
        setPaymentFailed(true);
        toastr.error("Error", "There was an error processing the payment");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const isFormValid =
    formData.cardName &&
    formData.cardNumber &&
    formData.country &&
    formData.cvc &&
    formData.expiryDate &&
    formData.zipCode &&
    checked;

  return (
    <>
      <Modal
        fullWidth
        show={isOrderContractModalOpen}
        handleClose={() => setIsOrderContractModalOpen(false)}
      >
        <OrderContract />
      </Modal>
      <LoadingSpinner show={isLoading} />
      <Page>
        {banner}
        <PageContent styleName="container">
          <ServicePrice
            hideTitle
            showIcon={showIcon}
            icon={icon}
            price={estimate.total}
            duration={estimate.totalDuration}
            stickerPrice={estimate?.stickerPrice}
            serviceType={workType?.selectedWorkTypeDetail}
          />
          <br />
          <br />
          {secondaryBanner}
          <PageDivider />
          {introText && <div styleName="infoAlert">{introText}</div>}
          <div styleName="splitView">
            <div styleName="reviewContainer">
              <ReviewTable formData={intakeFormData} enableEdit={enableEdit} />
              <HelpBanner
                styles={["turqoise"]}
                title="Important things to know about your project"
              >
                <PageUl>
                  <li>
                    <strong>
                      Your Dashboard is your go-to hub for managing your work.
                    </strong>
                    &nbsp; From here you can view timelines, details, and a more
                    important information tied to your work submissions.
                  </li>
                  <li>
                    <strong>
                      You can expect members of our community to ask you
                      questions about this work.
                    </strong>
                    &nbsp; From your Work Summary page you’ll see if you have
                    any outstanding Messages indicated by a red icon. Please
                    answer questions from our members in a timely and thorough
                    manner. This will help them deliver high quality results for
                    you on time!
                  </li>
                  <li>
                    <strong>
                      Topcoder experts will curate the best solutions for you.
                    </strong>
                    &nbsp; This saves you time and energy wading through
                    submissions that perhaps aren't of value to you. When your
                    high-quality submissions are ready, you'll be notified to
                    download your assets, rate your Topcoder experience, and
                    officially close out this work.
                  </li>
                </PageUl>
              </HelpBanner>
            </div>
            <div styleName="paymentWrapper">
              <div styleName="paymentBox">
                <div styleName="total">
                  {estimate.stickerPrice && (
                    <span styleName="originalPrice">
                      {currencyFormat(estimate.stickerPrice)}
                    </span>
                  )}
                  {currencyFormat(estimate.total)}
                </div>

                <div styleName="totalInfo">Total Payment</div>

                <PageDivider styleName="pageDivider" />

                <PaymentForm formData={formData} setFormData={setFormData} />
                {paymentFailed && (
                  <div styleName="error">
                    Your card was declined. Please try a different card.
                  </div>
                )}

                <div styleName="contract">
                  <FormInputCheckbox
                    label="Yes, I understand and agree to Topcoder's&nbsp;"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    inline
                  />
                  <span
                    role="button"
                    tabIndex={0}
                    styleName="link"
                    onClick={() => setIsOrderContractModalOpen(true)}
                  >
                    Order Contract
                  </span>
                </div>

                <div styleName="paymentButtonContainer">
                  <Button
                    disabled={!isFormValid || isLoading}
                    size={BUTTON_SIZE.MEDIUM}
                    onClick={onNext}
                    styleName="wideButton"
                  >
                    PAY ${estimate.total}
                  </Button>
                </div>
              </div>
            </div>
          </div>

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
            </div>
          </PageFoot>
          {showProgress && <Progress level={6} setStep={setProgressItem} />}
        </PageContent>
      </Page>
    </>
  );
};

const ReviewWrapper = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <Review {...props} />
    </Elements>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  setProgressItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthentication(ReviewWrapper));
