import { navigate, redirectTo } from "@reach/router";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
import { toastr } from "react-redux-toastr";
import { submitWork } from "services/form";
import config from "../../../config";
import { triggerAutoSave } from "../../actions/autoSave";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import { loadChallengeId } from "../../autoSaveBeforeLogin";
import withAuthentication from "../../hoc/withAuthentication";
import * as services from "../../services/payment";
import PaymentForm from "./components/PaymentForm";
import "./styles.module.scss";

const stripePromise = loadStripe(config.STRIPE.API_KEY, {
  apiVersion: config.STRIPE.API_VERSION,
});

/**
 * Payment Page
 */
const Payment = ({ setProgressItem }) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const form = useSelector((state) => state.form);
  const price = useSelector((state) => state.form.price);
  const additionalPrice = useSelector((state) => state.form.additionalPrice);
  const devicePrice = useSelector((state) => state.form.devicePrice);
  const pagePrice = useSelector((state) => state.form.pagePrice);
  const total = price + additionalPrice + devicePrice + pagePrice;
  const currentStep = useSelector((state) => state.progress.currentStep);
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    amount: total,
    currency: null,
    cardNumber: false,
    expiryDate: false,
    cvc: false,
  });

  const onBack = () => {
    navigate("/self-service/review");
  };

  const challengeId = loadChallengeId();
  const onNext = () => {
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    services
      .processPayment(
        stripe,
        elements,
        formData.amount,
        formData.currency,
        challengeId
      )
      .then((res) => {
        submitWork(form);
        navigate("/self-service/thank-you");
        setProgressItem(8);
      })
      .catch(() => {
        toastr.error("Error", "There was an error on payment");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setProgressItem(7);
    if (currentStep === 0) {
      redirectTo("/self-service/wizard");
    }

    return () => {
      dispatch(triggerAutoSave(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFormValid =
    formData.amount &&
    Number(formData.amount) >= total &&
    formData.currency &&
    formData.cardNumber &&
    formData.expiryDate &&
    formData.cvc &&
    checked;

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>PAYMENT</PageH2>
          <PageDivider />
          <div styleName="container">
            <div styleName="paymentWrapper">
              <div styleName="title">
                Please provide your credit card info. A hold will be placed on
                your card for an amount of ${total}. When work begins your card
                will be charged.
              </div>

              <div styleName="paymentBox">
                <PaymentForm
                  minAmount={total}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>

              <div styleName="confirmationBox">
                <FormInputCheckbox
                  label={"Yes, I confirm the above details are correct"}
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
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
              <div styleName="footer-right">
                <Button
                  disabled={!isFormValid || isLoading}
                  size={BUTTON_SIZE.MEDIUM}
                  onClick={onNext}
                >
                  SUBMIT WORK
                </Button>
              </div>
            </div>
          </PageFoot>

          <Progress level={6} />
        </PageContent>
      </Page>
    </>
  );
};

const PaymentWrapper = ({ setProgressItem }) => {
  return (
    <Elements stripe={stripePromise}>
      <Payment setProgressItem={setProgressItem} />
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
)(withAuthentication(PaymentWrapper));
