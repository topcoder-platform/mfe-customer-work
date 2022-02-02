import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const Tabs = ({ children }) => {
  return (
    <div styleName="tabs">
      <div styleName="tab-container">{children}</div>
    </div>
  );
};

Tabs.defaultProps = {};

Tabs.propTypes = {
  children: PT.node,
};

export default Tabs;
