import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const TabPane = ({ children, tab, value }) => {
  return <div hidden={tab !== value}>{children}</div>;
};

TabPane.defaultProps = {};

TabPane.propTypes = {
  children: PT.node,
  tab: PT.string,
  value: PT.string,
};

export default TabPane;
