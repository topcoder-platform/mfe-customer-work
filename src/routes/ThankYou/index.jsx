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

/**
 * Thank You Page
 */
const ThankYou = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    clearPreviousForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div styleName="container">
            <div styleName="content">
              <PageH2>THANK YOU</PageH2>
              <p>
                Your payment has been processed successfully. You will now be
                taken to your work Dashboard where you can manage the work
                you’ve submitted.
              </p>

              <div styleName="btn">
                <Button size={BUTTON_SIZE.MEDIUM} onClick={onDone}>
                  Go to Dashboard
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
