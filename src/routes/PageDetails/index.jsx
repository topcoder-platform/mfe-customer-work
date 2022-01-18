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
import { connect, useDispatch, useSelector } from "react-redux";
import { triggerAutoSave } from "../../actions/autoSave";
import { savePageDetails, updatePagePrice } from "../../actions/form";
import { setProgressItem } from "../../actions/progress";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import PageDetailsForm from "./components/PageDetailsForm";
import "./styles.module.scss";

/**
 * Page Details Page
 */
const PageDetails = ({ updatePagePrice, savePageDetails, setProgressItem }) => {
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
  const price = useSelector((state) => state.form.price);
  const additionalPrice = useSelector((state) => state.form.additionalPrice);
  const devicePrice = useSelector((state) => state.form.devicePrice);
  const pagePrice = useSelector((state) => state.form.pagePrice);
  const total = price + additionalPrice + devicePrice + pagePrice;
  const workType = useSelector((state) => state.form.workType);
  const pageDetails = useSelector((state) => state.form.pageDetails);
  const currentStep = useSelector((state) => state.progress.currentStep);

  const onBack = () => {
    navigate("/self-service/website-purpose");
  };

  useEffect(() => {
    setProgressItem(4);

    if (currentStep === 0) {
      redirectTo("/self-service/wizard");
    }

    if (pageDetails) {
      setListInputs(pageDetails);
    }

    return () => {
      dispatch(triggerAutoSave(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNext = () => {
    navigate("/self-service/branding");
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

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>PAGE DETAILS</PageH2>
          <PageDivider />

          <PageDetailsForm
            price={total}
            savePageDetails={savePageDetails}
            serviceType={workType?.selectedWorkTypeDetail}
            listInputs={listInputs}
            setListInputs={setListInputs}
            onAdd={() => updatePagePrice(pagePrice + 100)}
            onRemove={() => updatePagePrice(pagePrice - 100)}
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

          <Progress level={4} />
        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  updatePagePrice,
  savePageDetails,
  setProgressItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetails);
