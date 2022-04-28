import React, { useCallback, useContext } from "react";
import { connect, useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import Header from "../../../../components/PageHeader";
import Button from "components/Button";
import { BUTTON_SIZE } from "constants/index.js";
import styles from "./styles.module.scss";
import {
  clearAutoSavedForm,
  clearCachedChallengeId,
} from "../../../../autoSaveBeforeLogin";
import { resetIntakeForm } from "../../../../actions/form";

import { workContext } from '../../../../../src-ts/lib'
import { WorkTable } from '../../../../../src-ts/tools/work'

/**
 * Displays My Work Dashboard with work item list.
 *
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  const dispatch = useDispatch();

  const workContextData = useContext(workContext)
  const { hasWork, workError } = workContextData

  const onClickBtnStart = useCallback(() => {
    clearCachedChallengeId();
    clearAutoSavedForm();
    dispatch(resetIntakeForm(true));
    navigate(`/self-service/wizard`);
  }, []);

  const workErrorElement = !!workError
    ? (
      <div styleName="error">
        <span>{workError}</span>
      </div>
    )
    : undefined

  return (
    <div styleName="container">
      <Header title="My Work" onClick={onClickBtnStart} buttonContent="START WORK" />
      <div styleName="content">
        {workErrorElement}
        <WorkTable />
      </div>
    </div>
  );
};

const mapStateToProps = ({ form }) => form;
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
