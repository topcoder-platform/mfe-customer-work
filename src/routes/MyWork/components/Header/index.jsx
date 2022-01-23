import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { navigate } from "@reach/router";
import Button from "components/Button";
import { getWorksCount } from "selectors/myWork";
import { ROUTES } from "constants/index.js";
import styles from "./styles.module.scss";

/**
 * Displays dashboard's header with title and "Start Work" button.
 *
 * @returns {JSX.Element}
 */
const Header = ({ onStartWork }) => {
  const worksCount = useSelector(getWorksCount);

  return (
    <div styleName="container">
      <h2 styleName="heading">My Work</h2>
      {!!worksCount && (
        <Button className={styles.button} onClick={onStartWork}>
          START WORK
        </Button>
      )}
    </div>
  );
};

export default Header;
