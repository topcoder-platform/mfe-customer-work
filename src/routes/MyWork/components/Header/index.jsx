import React, { useContext } from "react";
import Button from "components/Button";
import styles from "./styles.module.scss";

import { workContext } from '../../../../../src-ts/lib'

/**
 * Displays dashboard's header with title and "Start Work" button.
 *
 * @returns {JSX.Element}
 */
const Header = ({ onStartWork }) => {

  const workContextData = useContext(workContext)

  return (
    <div styleName="container">

      <h2 styleName="heading">My Work</h2>

      {workContextData.hasWork && (
        <Button className={styles.button} onClick={onStartWork}>
          START WORK
        </Button>
      )}

    </div>
  );
};

export default Header;
