import { navigate } from "@reach/router";
import Button from "components/Button";
import LoadingSpinner from "components/LoadingSpinner";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageH2 from "components/PageElements/PageH2";
import { BUTTON_SIZE, MAX_COMPLETED_STEP, webWorkTypes } from "constants/";
import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import "./styles.module.scss";
import { setCookie } from "../../autoSaveBeforeLogin";
import { resetIntakeForm } from "../../actions/form";
import { setProgressItem } from "../../actions/progress";

/**
 * Thank You Page
 */
const ThankYou = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [selectedWorkType, setSelectedWorkType] = useState("");

  useEffect(() => {
    setSelectedWorkType(webWorkTypes[0]);
  }, []);

  const clearPreviousForm = () => {
    dispatch(resetIntakeForm(true));
    setCookie(MAX_COMPLETED_STEP, "", -1);
  };

  const onDone = async () => {
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
                  Go to My Work
                </Button>
              </div>
            </div>
          </div>

        </PageContent>
      </Page>
    </>
  );
};

const mapStateToProps = ({ form }) => form;

const mapDispatchToProps = { setProgressItem };

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
