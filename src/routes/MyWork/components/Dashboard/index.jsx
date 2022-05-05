import React, { useCallback } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import Header from "../Header";
import WorkList from "../WorkList";
import * as selectors from "selectors/myWork";
import Button from "components/Button";
import { BUTTON_SIZE } from "constants/index.js";
import styles from "./styles.module.scss";
import {
  clearAutoSavedForm,
  clearCachedChallengeId,
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
    clearCachedChallengeId();
    clearAutoSavedForm();
    dispatch(resetIntakeForm(true));
    navigate(`/self-service/wizard`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
