import React, { useCallback, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import Header from "../Header";
import WorkList from "../WorkList";
import * as selectors from "selectors/myWork";
import Button from "components/Button";
import { ROUTES } from "constants/";
import { BUTTON_SIZE, MAX_COMPLETED_STEP } from "constants/index.js";
import styles from "./styles.module.scss";
import {
  clearAutoSavedForm,
  clearCachedChallengeId,
  setCookie,
} from "../../../../../src/autoSaveBeforeLogin";
import { resetIntakeForm } from "../../../../../src/actions/form";

/**
 * Displays My Work Dashboard with work item list.
 *
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  const dispatch = useDispatch();

  const worksCount = useSelector(selectors.getWorksCount);
  const worksError = useSelector(selectors.getWorksError);

  const onClickBtnStart = useCallback(() => {
    setCookie(MAX_COMPLETED_STEP, "", -1);
    clearCachedChallengeId();
    clearAutoSavedForm();
    dispatch(resetIntakeForm(true));
    navigate(ROUTES.INTAKE_FORM);
  }, []);

  return (
    <div styleName="container">
      <div styleName="content">
        <Header onStartWork={onClickBtnStart} />
        {worksError ? (
          <div styleName="error">
            <span>{worksError}</span>
          </div>
        ) : worksCount ? (
          <WorkList />
        ) : (
          <div styleName="start-message">
            <div styleName="text">
              This is your home where your future work will live. Let’s go!
            </div>
            <Button
              size={BUTTON_SIZE.MEDIUM}
              className={styles.button}
              onClick={onClickBtnStart}
            >
              START WORK
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ form }) => form;
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
