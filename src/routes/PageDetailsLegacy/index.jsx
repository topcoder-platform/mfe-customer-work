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
import { connect, useDispatch, useSelector } from "react-redux";
import { getDynamicPriceAndTimelineEstimate } from "utils/";
import { triggerAutoSave } from "../../actions/autoSave";
import { resetIntakeForm, savePageDetails } from "../../actions/form";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import PageDetailsForm from "./components/PageDetailsForm";
import { WebsiteDesignBannerLegacy } from "../../components/Banners/WebsiteDesignBannerLegacy";
import "./styles.module.scss";
import { ROUTES } from "../../constants";
import { Breadcrumb } from "../../../src-ts";

/**
 * Page Details Page
 */
const PageDetailsLegacy = ({ savePageDetails, setProgressItem }) => {
  const [isLoading, setLoading] = useState(false);
  const [listInputs, setListInputs] = useState({
    pages: [
      {
        pageName: "",
        pageDetails: "",
      },
    ],
  });
  const dispatch = useDispatch();
  const workType = useSelector((state) => state.form.workType);
  const pageDetails = useSelector((state) => state.form.pageDetails);
  const currentStep = useSelector((state) => state.progress.currentStep);
  const fullState = useSelector((state) => state);
  const estimate = getDynamicPriceAndTimelineEstimate(fullState);

  const onBack = () => {
    navigate("/self-service/work/new/website-design/website-purpose");
  };

  const [firstMounted, setFirstMounted] = useState(true);
  useEffect(() => {
    if (!firstMounted) {
      return;
    }

    setProgressItem(4);

    if (currentStep === 0) {
      redirectTo("/self-service/wizard");
    }

    if (pageDetails) {
      setListInputs(pageDetails);
    }

    setFirstMounted(false);

    return () => {
      dispatch(triggerAutoSave(true));
    };
  }, [currentStep, pageDetails, dispatch, setProgressItem, firstMounted]);

  const onNext = () => {
    navigate("/self-service/work/new/website-design/login-prompt");
    savePageDetails(listInputs);
    setProgressItem(5);
  };

  const isFormValid = () => {
    let isValid = true;
    (listInputs?.pages || []).forEach((item) => {
      if (!item.pageName.length || !item.pageDetails.length) {
        isValid = false;
      }
    });
    return isValid;
  };

  const breadcrumbs = [
    { url: ROUTES.DASHBOARD_PAGE, name: "My work" },
    {
      url: ROUTES.INTAKE_FORM,
      name: "Start work",
      onClick: () => {
        dispatch(resetIntakeForm(true));
      },
    },
    { url: ROUTES.WEBSITE_DESIGN_LEGACY, name: "Basic Info" },
    { url: ROUTES.WEBSITE_DESIGN_PURPOSE_LEGACY, name: "Website purpose" },
    { url: "#", name: "Page details" },
  ];

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <Breadcrumb items={breadcrumbs} />
        <WebsiteDesignBannerLegacy />
        <PageContent>
          <PageH2>PAGE DETAILS</PageH2>
          <PageDivider />

          <PageDetailsForm
            estimate={estimate}
            savePageDetails={savePageDetails}
            serviceType={workType?.selectedWorkTypeDetail}
            listInputs={listInputs}
            setListInputs={setListInputs}
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
                  disabled={!isFormValid()}
                  size={BUTTON_SIZE.MEDIUM}
                  onClick={onNext}
                >
                  NEXT
                </Button>
              </div>
            </div>
          </PageFoot>

          <Progress level={4} setStep={setProgressItem} />
        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  savePageDetails,
  setProgressItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetailsLegacy);
