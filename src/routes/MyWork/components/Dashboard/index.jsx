import React, { useCallback, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import Header from "../Header";
import WorkList from "../WorkList";
import * as selectors from "selectors/myWork";
import Button from "components/Button";
import { webWorkTypes, workTypes } from "constants/";
import { BUTTON_SIZE, MAX_COMPLETED_STEP } from "constants/index.js";
import styles from "./styles.module.scss";
import {
  clearAutoSavedForm,
  clearCachedChallengeId,
  setCookie,
} from "../../../../../src/autoSaveBeforeLogin";
import { resetIntakeForm, saveWorkType } from "../../../../../src/actions/form";
import { setProgressItem } from "../../../../../src/actions/progress";
import { triggerAutoSave } from "../../../../../src/actions/autoSave";

/**
 * Displays My Work Dashboard with work item list.
 *
 * @returns {JSX.Element}
 */
const Dashboard = ({ saveWorkType, setProgressItem }) => {
  const dispatch = useDispatch();

  const worksCount = useSelector(selectors.getWorksCount);
  const worksError = useSelector(selectors.getWorksError);

  const allWorkTypes = [...workTypes, ...webWorkTypes];
  const workTypesComingSoon = allWorkTypes.filter((wt) => wt.comingSoon);
  const featuredWorkType = allWorkTypes.find((wt) => wt.featured);

  const onClickBtnStart = useCallback(() => {
    clearCachedChallengeId();
    clearAutoSavedForm();
    dispatch(resetIntakeForm(true));
    // This is a temporary hack to get the customer directly into the 1st step of the wizard
    saveWorkType({
      selectedWorkType: featuredWorkType.title,
      selectedWorkTypeDetail: featuredWorkType.title,
    });
    setProgressItem(2);
    navigate(`/self-service/basic-info`);
    dispatch(triggerAutoSave(true));
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
const mapDispatchToProps = {
  saveWorkType,
  setProgressItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
