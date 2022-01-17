import React, { useEffect, useLayoutEffect } from "react";
import { Redirect, Router } from "@reach/router";
import { useSelector } from "react-redux";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import Sidebar from "components/Sidebar";
import useMatchSomeRoute from "hooks/useMatchSomeRoute";
import { disabledSidebarRoutes, menuItems } from "./constants";
import BasicInfo from "./routes/BasicInfo";
import Branding from "./routes/Branding";
import MyWork from "./routes/MyWork";
import PageDetails from "./routes/PageDetails";
import Payment from "./routes/Payment";
import Review from "./routes/Review";
import SelectWorkType from "./routes/SelectWorkType";
import ThankYou from "./routes/ThankYou";
import WebsitePurpose from "./routes/WebsitePurpose";
import IntakeForm from "./IntakeForm";
import WorkItems from "./routes/WorkItems";
import { getIsLoggedIn } from "./hoc/withAuthentication/selectors";
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
