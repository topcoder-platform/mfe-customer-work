import { navigate, redirectTo } from "@reach/router";
import Button from "components/Button";
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
import { saveBranding } from "../../actions/form";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import BrandingForm from "./components/BrandingForm";
import "./styles.module.scss";

/**
 * Branding Page
 */
const Branding = ({ saveBranding, setProgressItem }) => {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    theme: { title: "Style & Theme", option: "", value: null },
    website: { title: "Inspiration web site", option: "", value: "" },
    description: { title: "What Do you like", option: "", value: "" },
    colorOption: { title: "Colors", option: "", value: 0 },
    specificColor: { title: "Custom Color", option: "", value: "" },
    fontOption: { title: "Fonts", option: "", value: 0 },
    design: { title: "Allow Stock Photos?", option: "", value: null },
    anythingToAvoid: { title: "Anything to Avoid?", option: "", value: "" },
    selectedDeliverableOption: {
      title: "Final Deliverable Option",
      option: "",
      value: null,
    },
    customDeliverable: { title: "Custom Delivrable", option: "", value: "" },
  });
  const price = useSelector((state) => state.form.price);
  const additionalPrice = useSelector((state) => state.form.additionalPrice);
  const devicePrice = useSelector((state) => state.form.devicePrice);
  const pagePrice = useSelector((state) => state.form.pagePrice);
  const total = price + additionalPrice + devicePrice + pagePrice;
  const workType = useSelector((state) => state.form.workType);
  const branding = useSelector((state) => state.form.branding);
  const currentStep = useSelector((state) => state.progress.currentStep);

  const [firstMounted, setFirstMounted] = useState(true);
  useEffect(() => {
    if (firstMounted) {
      if (currentStep === 0) {
        redirectTo("/self-service");
      }

      if (branding) {
        setFormData(branding);
      }

      setFirstMounted(false);
    }
  }, [currentStep, branding, firstMounted]);

  const isFormValid =
    formData?.theme?.value &&
    formData?.selectedDeliverableOption?.value !== null;

  const onBack = () => {
    navigate("/self-service/page-details");
  };

  const onNext = () => {
    navigate("/self-service/review");
    saveBranding(formData);
    setProgressItem(5);
  };

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>BRANDING</PageH2>
          <PageDivider />

          <BrandingForm
            price={total}
            serviceType={workType?.selectedWorkTypeDetail}
            formData={formData}
            setFormData={setFormData}
          />

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

          <Progress level={5} />
        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  saveBranding,
  setProgressItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Branding);
