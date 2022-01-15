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
import React, { useEffect, useRef, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { triggerAutoSave } from "../../actions/autoSave";
import { saveWebsitePurpose } from "../../actions/form";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import WebsitePurposeForm from "./components/WebsitePurposeForm";
import "./styles.module.scss";

/**
 * Website Purpose Page
 */
const WebsitePurpose = ({ saveWebsitePurpose, setProgressItem }) => {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    industry: { title: "Your Industry", option: "", value: null },
    description: { title: "Description", option: "", value: "" },
    userStory: { title: "User Story", option: "", value: "" },
    existingWebsite: { title: "Existing Website?", option: "", value: "" },
    existingWebsiteInfo: {
      title: "Existing Website Information",
      option: "",
      value: "",
    },
  });
  const dispatch = useDispatch();
  const price = useSelector((state) => state.form.price);
  const additionalPrice = useSelector((state) => state.form.additionalPrice);
  const devicePrice = useSelector((state) => state.form.devicePrice);
  const pagePrice = useSelector((state) => state.form.pagePrice);
  const total = price + additionalPrice + devicePrice + pagePrice;
  const workType = useSelector((state) => state.form.workType);
  const websitePurpose = useSelector((state) => state.form.websitePurpose);
  const currentStep = useSelector((state) => state.progress.currentStep);

  const isFormValid =
    formData?.industry?.value &&
    formData?.description?.value.length &&
    formData?.userStory?.value.length;

  const onBack = () => {
    navigate("/self-service/basic-info");
  };

  const onNext = () => {
    saveWebsitePurpose(formData);
    navigate("/self-service/page-details");
    setProgressItem(4);
  };

  useEffect(() => {
    setProgressItem(3);

    if (currentStep === 0) {
      redirectTo("/self-service");
    }

    if (websitePurpose) {
      setFormData(websitePurpose);
    }

    return () => {
      dispatch(triggerAutoSave(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>WEBSITE PURPOSE</PageH2>
          <PageDivider />

          <WebsitePurposeForm
            price={total}
            serviceType={workType?.selectedWorkTypeDetail}
            formData={formData}
            setFormData={setFormData}
            saveWebsitePurpose={saveWebsitePurpose}
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

          <Progress level={3} />
        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  saveWebsitePurpose,
  setProgressItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsitePurpose);
