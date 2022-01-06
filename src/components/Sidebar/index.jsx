/**
 * Sidebar component
 */
import { navigate } from "@reach/router";
import classNames from "classnames";
import React from "react";
import ActiveIndicator from "../../assets/images/icon-active-indicator.svg";
import "./styles.module.scss";

const Sidebar = ({ menus }) => {
  return (
    <div styleName="sidebar">
      {menus.map((menu) => {
        const isActive = window.location.pathname.includes(menu.url);
        return (
          <div
            styleName="menu"
            role="button"
            tabIndex={0}
            onClick={() => {
              navigate(menu.url);
            }}
          >
            <div styleName="icon">{isActive ? menu.activeIcon : menu.icon}</div>

            <p styleName={classNames("item", isActive ? "active" : null)}>
              {menu.item}
              <div styleName="activeIndicator">
                {isActive ? <ActiveIndicator /> : null}
              </div>
            </p>
          </div>
        );
      })}
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
