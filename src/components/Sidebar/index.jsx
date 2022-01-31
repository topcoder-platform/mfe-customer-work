/**
 * Sidebar component
 */
import { Link, useLocation } from "@reach/router";
import classNames from "classnames";
import React, { useMemo } from "react";
import ActiveIndicator from "../../assets/images/icon-active-indicator.svg";
import "./styles.module.scss";

const Sidebar = ({ menus }) => {
  const location = useLocation();
  const activeMenuUrl = useMemo(() => {
    const bestMatch = menus
      .filter((i) => location.pathname.startsWith(i.url))
      .sort((a, b) => a.url.length - b.url.length)
      .pop();
    return bestMatch && bestMatch.url;
  }, [location, menus]);

  return (
    <div styleName="sidebar">
      {menus.map((menu) => {
        const isActive = menu.url === activeMenuUrl;
        return (
          <Link
            styleName={classNames("menu", isActive ? "disabled" : "")}
            to={menu.url}
          >
            <div styleName="icon">{isActive ? menu.activeIcon : menu.icon}</div>

            <p styleName={classNames("item", isActive ? "active" : null)}>
              {menu.item}
              <div styleName="activeIndicator">
                {isActive ? <ActiveIndicator /> : null}
              </div>
            </p>
          </Link>
        );
      })}
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
