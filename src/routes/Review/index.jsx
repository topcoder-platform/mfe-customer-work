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
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import ReviewTable from "./components/ReviewTable";
import "./styles.module.scss";

/**
 * Review Page
 */
const Review = ({ setProgressItem }) => {
  const [isLoading, setLoading] = useState(false);
  const formData = useSelector((state) => state.form);
  const [checked, setChecked] = useState(false);
  const currentStep = useSelector((state) => state.progress.currentStep);

  const [firstMounted, setFirstMounted] = useState(true);
  useEffect(() => {
    if (firstMounted) {
      if (currentStep === 0) {
        redirectTo("/self-service");
      }

      setFirstMounted(false);
    }
  }, [currentStep, firstMounted]);

  const onBack = () => {
    navigate("/self-service/branding");
  };

  const onNext = () => {
    navigate("/self-service/payment");
    setProgressItem(6);
  };

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>REVIEW</PageH2>
          <PageDivider />

          <ReviewTable formData={formData} />

          <div styleName="confirmationBox">
            <FormInputCheckbox
              label={"Yes, I confirm the above details are correct"}
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
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
                  NEXT
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

export default connect(mapStateToProps, mapDispatchToProps)(Review);
