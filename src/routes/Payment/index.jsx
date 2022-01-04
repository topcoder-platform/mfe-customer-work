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
import { connect, useSelector } from "react-redux";
import { submitWork } from "services/form";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import withAuthentication from "../../hoc/withAuthentication";
import "./styles.module.scss";

/**
 * Payment Page
 */
const Payment = ({ setProgressItem }) => {
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const authUser = useSelector((state) => state.authUser);
  const form = useSelector((state) => state.form);
  const price = useSelector((state) => state.form.price);
  const additionalPrice = useSelector((state) => state.form.additionalPrice);
  const devicePrice = useSelector((state) => state.form.devicePrice);
  const pagePrice = useSelector((state) => state.form.pagePrice);
  const total = price + additionalPrice + devicePrice + pagePrice;
  const currentStep = useSelector((state) => state.progress.currentStep);

  const onBack = () => {
    navigate("/self-service/review");
  };

  const onNext = () => {
    submitWork(form);
    navigate("/self-service/thank-you");
    setProgressItem(7);
  };

  useEffect(() => {
    if (currentStep === 0) {
      redirectTo("/self-service");
    }
  }, []);

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>PAYMENT</PageH2>
          <PageDivider />

          <PageDivider />

          <div styleName="container">
            <div styleName="paymentWrapper">
              <div styleName="title">
                Please provide your credit card info. A hold will be placed on
                your card for an amount of ${total}. When work begins your card
                will be charged.
              </div>

              <div styleName="paymentBox">
                <p>Stripe Payment</p>
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
                  disabled={!checked}
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

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  setProgressItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthentication(Payment));
