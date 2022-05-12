import React from "react";
import PT from "prop-types";
import Button from "components/Button";
import { BUTTON_TYPE, BUTTON_SIZE } from "constants";
import "./styles.module.scss";

const SolutionListItem = ({ solution, onDownload }) => {
  return (
    <li styleName="solution-list-item">
      <div styleName="name">Submitted by: {solution.createdBy}</div>
      <Button
        onClick={onDownload}
        type={BUTTON_TYPE.SECONDARY}
        size={BUTTON_SIZE.SMALL}
      >
        DOWNLOAD
      </Button>
    </li>
  );
};

SolutionListItem.defaultProps = {};

SolutionListItem.propTypes = {
  solution: PT.shape(),
  onDownload: PT.func,
};

export default SolutionListItem;
