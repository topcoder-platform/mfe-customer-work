import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const SolutionList = ({ children }) => {
  return <ul styleName="solution-list">{children}</ul>;
};

SolutionList.defaultProps = {};

SolutionList.propTypes = {
  children: PT.node,
};

export default SolutionList;
