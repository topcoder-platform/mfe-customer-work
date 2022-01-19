import React from "react";
import PT from "prop-types";
import IconWarning from "../../../../../../assets/images/icon-warning.svg";
import styles from "./styles.module.scss";

const Point = ({ step }) => {
  const { active, completed, name } = step;
  const color = completed ? "completed" : active ? "active" : "";

  return (
    <div styleName={`point ${color}`} className={`point ${styles["name"]}`}>
      {name === "send-to-solutions-expert" && (
        <IconWarning styleName="icon-warning" />
      )}
    </div>
  );
};

Point.defaultProps = {};

Point.propTypes = {
  step: PT.shape(),
};

export default Point;
