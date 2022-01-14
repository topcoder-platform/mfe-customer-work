/**
 * Tabs element
 */
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import classNames from "classnames";
import PT from "prop-types";
import React, { useEffect, useState } from "react";
import { getForumNotifications } from "services/challenge";
import "./styles.module.scss";

const Tabs = ({ challengeId, tabs, selectedTab, onSelect }) => {
  const [handle, setHandle] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    getAuthUserProfile().then((res) => {
      setHandle(res.handle);
    });
  }, []);

  useEffect(() => {
    if (challengeId && handle) {
      getForumNotifications(challengeId, handle).then((d) => {
        setUnreadNotifications(d?.unreadNotifications);
      });
    }
  }, [challengeId, handle]);

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
          <>
            {tab}
            {tab === "Messaging" && unreadNotifications ? (
              <div styleName="notification">
                <span>{String(unreadNotifications).padStart(2, "0")}</span>
              </div>
            ) : null}
          </>
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
  challengeId: PT.string.isRequired,
};

export default Tabs;
