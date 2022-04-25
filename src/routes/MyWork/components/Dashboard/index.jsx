import React, { useCallback, useContext } from "react";
import { connect, useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import Header from "../Header";
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

  const workTable = hasWork
    ? <WorkTable />
    : undefined

  const noWork = !!workTable
    ? undefined
    : (
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
    )

  return (
    <div styleName="container">
      <div styleName="content">
        <Header onStartWork={onClickBtnStart} />
        {workErrorElement}
        {workTable}
        {noWork}
      </div>
    </div>
  );
};

const mapStateToProps = ({ form }) => form;
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
