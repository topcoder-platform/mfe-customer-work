import React from "react";
import cn from "classnames";
import PT from "prop-types";
import "./styles.module.scss";

const Tab = ({ children, active, onClick }) => {
  return (
    <div
      styleName={cn("tab", { active })}
      role="tab"
      onClick={onClick}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

Tab.defaultProps = {};

Tab.propTypes = {
  children: PT.node,
  active: PT.bool,
  onClick: PT.func,
};

export default Tab;
