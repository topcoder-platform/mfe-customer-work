import React, { useCallback } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import Header from "../../../../components/PageHeader";
import WorkList from "../WorkList";
import * as selectors from "selectors/myWork";
import "./styles.module.scss";
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
  }, []);

  return (
    <div styleName="container">
      <Header title="My Work" onClick={onClickBtnStart} buttonContent="START WORK" />
      <div styleName="content">
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
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ form }) => form;
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
