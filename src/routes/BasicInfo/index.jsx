import React, { useEffect, useState, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { navigate, redirectTo } from "@reach/router";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageFoot from "components/PageElements/PageFoot";
import PageH2 from "components/PageElements/PageH2";
import Progress from "components/Progress";
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  DeviceOptions,
  PageOptions,
} from "constants/";
import {
  addDevicePrice,
  saveBasicInfo,
  updateAdditionalPrice,
} from "../../actions/form";
import { triggerAutoSave } from "../../actions/autoSave";
import { setProgressItem } from "../../actions/progress";
import { savePageDetails } from "../../actions/form";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import BasicInfoForm from "./components/BasicInfoForm";
import "./styles.module.scss";

/**
 * Basic Info Page
 */
const BasicInfo = ({
  saveBasicInfo,
  updateAdditionalPrice,
  addDevicePrice,
  setProgressItem,
  savePageDetails,
}) => {
  const [formData, setFormData] = useState({
    projectTitle: { title: "Project Title", option: "", value: "" },
    selectedDevices: {
      title: "Device Types",
      option: ["Computer"],
      value: [0],
    },
  });
  const isFormValid = formData?.projectTitle?.value.length;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const price = useSelector((state) => state.form.price);
  const additionalPrice = useSelector((state) => state.form.additionalPrice);
  const devicePrice = useSelector((state) => state.form.devicePrice);
  const pagePrice = useSelector((state) => state.form.pagePrice);
  const total = price + additionalPrice + devicePrice + pagePrice;
  const workType = useSelector((state) => state.form.workType);
  const basicInfo = useSelector((state) => state.form.basicInfo);
  const currentStep = useSelector((state) => state.progress.currentStep);
  const pageDetails = useSelector((state) => state.form.pageDetails);

  const onBack = () => {
    navigate("/self-service/wizard");
  };

  const onNext = () => {
    setProgressItem(3);
    saveBasicInfo(formData);
    navigate("/self-service/website-purpose");
  };

  const updateNumOfPages = (newNumOfPages) => {
    let newPages = pageDetails.pages
    if (newNumOfPages < newPages.length) {
      newPages = newPages.slice(0, newNumOfPages)
    } else {
      for (let i = 0; i <= newNumOfPages - newPages.length; i += 1) {
        newPages.push({
          pageName: "",
          pageDetails: "",
        })
      }
    }
    savePageDetails({
      ...pageDetails,
      pages: newPages
    });
  };

  const [firstMounted, setFirstMounted] = useState(true);

  useEffect(() => {
    if (!firstMounted) {
      return;
    }

    setProgressItem(2);

    if (currentStep === 0) {
      redirectTo("/self-service/wizard");
    }

    if (basicInfo && basicInfo?.projectTitle?.value.length > 0) {
      setFormData(basicInfo);
    }

    setFirstMounted(true);

    return () => {
      dispatch(triggerAutoSave(true));
    };
  }, [basicInfo, currentStep, dispatch, setProgressItem, firstMounted]);

  useEffect(() => {
    if (formData) {
      updateAdditionalPrice(0); // TODO: fix this
      saveBasicInfo(formData);
    }
  }, [formData, updateAdditionalPrice, saveBasicInfo]);

  useEffect(() => {
    if (formData) {
      formData?.selectedDevices?.value.forEach((device) => {
        addDevicePrice(DeviceOptions[device]?.price || 0);
      });
      saveBasicInfo(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addDevicePrice, formData, formData.selectedDevices]);

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>BASIC INFO</PageH2>
          <PageDivider />

          <BasicInfoForm
            formData={formData}
            price={total}
            serviceType={workType?.selectedWorkTypeDetail}
            onFormUpdate={setFormData}
            numOfPages={pageDetails?.pages?.length || 0}
            updateNumOfPages={updateNumOfPages}
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

          <Progress level={2} setStep={setProgressItem} />
        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = {
  updateAdditionalPrice,
  saveBasicInfo,
  addDevicePrice,
  setProgressItem,
  savePageDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
