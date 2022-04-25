import React from "react";
import Button from "components/Button";
import styles from "./styles.module.scss";

/**
 * Displays dashboard's header with title and "Start Work" button.
 *
 * @returns {JSX.Element}
 */
const Header = ({ onStartWork }) => {

  return (
    <div styleName="container">

      <h2 styleName="heading">My Work</h2>

      <Button className={styles.button} onClick={onStartWork}>
        START WORK
      </Button>

    </div>
  );
};

export default Header;
