import { Link, navigate, redirectTo } from "@reach/router";
import classNames from "classnames";
import Button from "components/Button";
import FormInputCheckbox from "components/FormElements/FormInputCheckbox";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageFoot from "components/PageElements/PageFoot";
import PageH2 from "components/PageElements/PageH2";
import Progress from "components/Progress";
import { BUTTON_SIZE, BUTTON_TYPE, ProgressLevels } from "constants/";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { setProgressItem } from "../../actions/progress";
import ArrowIcon from "../../assets/images/icon-arrow.svg";
import BackIcon from "../../assets/images/icon-back-arrow.svg";
import "./styles.module.scss";

/**
 * Review Page
 */
const Review = ({ setProgressItem }) => {
  const [isLoading, setLoading] = useState(false);
  const formData = useSelector((state) => state.form);
  const [checked, setChecked] = useState(false);
  const [steps, setSteps] = useState([
    { id: 0, label: "Basic Info", value: "basicInfo", isOpen: false },
    { id: 1, label: "Website Purpose", value: "websitePurpose", isOpen: false },
    { id: 2, label: "Page Details", value: "pageDetails", isOpen: false },
    { id: 3, label: "Branding", value: "branding", isOpen: false },
  ]);
  const currentStep = useSelector((state) => state.progress.currentStep);

  const setStepToggler = (id) => {
    const newSteps = steps.map((item) =>
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    );

    setSteps(newSteps);
  };

  useEffect(() => {
    if (currentStep === 0) {
      redirectTo("/self-service");
    }
  }, []);

  const onBack = () => {
    navigate("/self-service/branding");
  };

  const onNext = () => {
    navigate("/self-service/payment");
    setProgressItem(6);
  };

  const renderDetails = (step) => {
    const redirectPage = ProgressLevels.find(
      (item) => item.label === step.label
    );
    const items = formData[step.value] || {};
    return Object.keys(items).map((key) => (
      <div>
        {items[key]?.option && (
          <div styleName="detail">
            <div styleName="itemWrapper">
              <p styleName="item">{items[key]?.title}</p>
              <Link styleName="link" to={redirectPage?.url}>
                edit
              </Link>
            </div>
            <p styleName="key">{items[key]?.option}</p>
          </div>
        )}
      </div>
    ));
  };

  const renderPageDetails = (step) => {
    const items = formData[step.value] || {};
    const pages = items?.pages || [];
    const redirectPage = ProgressLevels.find(
      (item) => item.label === step.label
    );

    return pages.map((page, index) => {
      return (
        <div>
          {page?.pageName && (
            <div styleName="detail">
              <div styleName="itemWrapper">
                <p styleName="item">Page {index + 1} Name</p>
                <Link styleName="link" to={redirectPage?.url}>
                  edit
                </Link>
              </div>
              <p styleName="key">{page?.pageName}</p>
            </div>
          )}
          {page?.pageDetails && (
            <div styleName="detail">
              <div styleName="itemWrapper">
                <p styleName="item">Page {index + 1} Requirements</p>
                <Link styleName="link" to={redirectPage?.url}>
                  edit
                </Link>
              </div>
              <p styleName="key">{page?.pageDetails}</p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>REVIEW</PageH2>
          <PageDivider />

          {steps.map((step, index) => {
            return (
              <>
                <div
                  styleName="header"
                  role="button"
                  tabIndex={0}
                  onClick={() => setStepToggler(index)}
                >
                  <p styleName="stepLabel">{step.label}</p>
                  <div
                    styleName={classNames("icon", step.isOpen ? "open" : null)}
                  >
                    <ArrowIcon />
                  </div>
                </div>

                {step.isOpen
                  ? step.value === "pageDetails"
                    ? renderPageDetails(step)
                    : renderDetails(step)
                  : null}

                <PageDivider />
              </>
            );
          })}

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
