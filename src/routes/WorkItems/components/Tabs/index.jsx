/**
 * Tabs element
 */
import classNames from "classnames";
import PT from "prop-types";
import React from "react";
import "./styles.module.scss";

const Tabs = ({ tabs, selectedTab, onSelect }) => {
  return (
    <div styleName="tabs">
      {tabs.map((tab, index) => (
        <div
          role="button"
          tabIndex={0}
          key={index}
          styleName={classNames("tab", selectedTab === tab ? "active" : null)}
          onClick={() => onSelect(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

Tabs.defaultProps = {
  tabs: [],
  selectedTab: "",
  selectedOption: 0,
};

Tabs.propTypes = {
  tabs: PT.arrayOf(PT.string),
  selectedTab: PT.string,
  onSelect: PT.func,
};

export default Tabs;
