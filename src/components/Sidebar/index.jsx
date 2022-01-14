/**
 * Sidebar component
 */
import { navigate, useLocation } from "@reach/router";
import classNames from "classnames";
import React, { useMemo } from "react";
import ActiveIndicator from "../../assets/images/icon-active-indicator.svg";
import "./styles.module.scss";

const Sidebar = ({ menus }) => {
  const location = useLocation();

  const activeUrl = useMemo(() => {
    let activeUrl = "";
    const pathname = location.pathname;
    for (const { url } of menus) {
      if (pathname.startsWith(url) && url.length > activeUrl.length) {
        activeUrl = url;
      }
    }
    return activeUrl;
  }, [location, menus]);

  return (
    <div styleName="sidebar">
      {menus.map((menu) => {
        const isActive = menu.url === activeUrl;
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
