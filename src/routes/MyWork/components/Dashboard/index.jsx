import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { navigate } from "@reach/router";
import Header from "../Header";
import WorkList from "../WorkList";
import * as selectors from "selectors/myWork";
import Button from "components/Button";
import { ROUTES } from "constants/";
import { BUTTON_SIZE } from "constants/index.js";
import styles from "./styles.module.scss";

/**
 * Displays My Work Dashboard with work item list.
 *
 * @returns {JSX.Element}
 */
const Dashboard = () => {
  const worksCount = useSelector(selectors.getWorksCount);
  const worksError = useSelector(selectors.getWorksError);

  const onClickBtnStart = useCallback(() => {
    navigate(ROUTES.INTAKE_FORM);
  }, []);

  return (
    <div styleName="container">
      <div styleName="content">
        <Header />
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

export default Dashboard;
