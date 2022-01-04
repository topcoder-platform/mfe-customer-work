import { navigate } from "@reach/router";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageH2 from "components/PageElements/PageH2";
import Progress from "components/Progress";
import { MAX_COMPLETED_STEP, BUTTON_SIZE, webWorkTypes } from "constants/";
import React, { useEffect, useState } from "react";
import "./styles.module.scss";

/**
 * Thank You Page
 */
const ThankYou = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedWorkType, setSelectedWorkType] = useState("");

  useEffect(() => {
    setSelectedWorkType(webWorkTypes[0]);
  }, []);

  const onDone = () => {
    localStorage.removeItem(MAX_COMPLETED_STEP);
    navigate("/self-service");
  };

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page>
        <PageContent>
          <PageH2>Thank You</PageH2>
          <PageDivider />

          <div styleName="container">
            <div styleName="content">
              <PageH2>THANK YOU</PageH2>
              <p>
                Your payment has been processed successfully. You will now be
                taken to your work dashboard where you can manage the work
                you’ve submitted.
              </p>

              <div styleName="btn">
                <Button size={BUTTON_SIZE.MEDIUM} onClick={onDone}>
                  SUBMIT WORK
                </Button>
              </div>
            </div>
          </div>

          <Progress level={6} />
        </PageContent>
      </Page>
    </>
  );
};

export default ThankYou;
