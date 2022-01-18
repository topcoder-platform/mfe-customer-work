import { Redirect, Router } from "@reach/router";
import {
  disableNavigationForRoute,
  disableSidebarForRoute,
} from "@topcoder/micro-frontends-navbar-app";
import Sidebar from "components/Sidebar";
import useMatchSomeRoute from "hooks/useMatchSomeRoute";
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { disabledSidebarRoutes, menuItems } from "./constants";
import { getIsLoggedIn } from "./hoc/withAuthentication/selectors";
import IntakeForm from "./IntakeForm";
import Home from "./routes/Home";
import MyWork from "./routes/MyWork";
import Profile from "./routes/Profile";
import WorkItems from "./routes/WorkItems";
import styles from "./styles/main.module.scss";

const App = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isSideBarDisabled = useMatchSomeRoute(disabledSidebarRoutes);

  useEffect(() => {
    disableSidebarForRoute("/self-service");
    disableSidebarForRoute("/self-service/basic-info");
    disableSidebarForRoute("/self-service/website-purpose");
    disableSidebarForRoute("/self-service/page-details");
    disableSidebarForRoute("/self-service/branding");
    disableSidebarForRoute("/self-service/review");
    disableSidebarForRoute("/self-service/payment");
    disableSidebarForRoute("/self-service/thank-you");
    disableSidebarForRoute("/self-service/wizard");
    disableSidebarForRoute("/self-service/work-items");
    disableSidebarForRoute("/self-service/home");
    disableSidebarForRoute("/self-service/profile");
    disableNavigationForRoute("/self-service/*");
  }, []);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--navbarHeight", "80px");
    return () => {
      // --navbarHeight must be set to its default value,
      // removeProperty won't work
      document.documentElement.style.setProperty("--navbarHeight", "60px");
    };
  }, []);

  useLayoutEffect(() => {
    if (isSideBarDisabled) {
      document.documentElement.style.setProperty("--sideBarWidth", 0);
      document.documentElement.style.setProperty("--mainContentMargin", 0);
    } else {
      document.documentElement.style.setProperty("--sideBarWidth", "104px");
      document.documentElement.style.setProperty("--mainContentMargin", "21px");
    }
  }, [isSideBarDisabled]);

  return (
    <>
      <Router>
        <IntakeForm path="/self-service/*" />
        <WorkItems path="/self-service/work-items/:workItemId" />
        <MyWork path="/self-service" />
        <Home path="/self-service/home" />
        <Profile path="/self-service/profile" />
        <Redirect
          default
          noThrow
          from="/self-service/work-items"
          to="/self-service"
        />
      </Router>
      {!isSideBarDisabled && isLoggedIn && (
        <div className={styles["sidebar-wrapper"]}>
          <Sidebar menus={menuItems} />
        </div>
      )}
    </>
  );
};

export default App;
