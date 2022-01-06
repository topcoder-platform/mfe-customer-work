import { Router } from "@reach/router";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import Sidebar from "components/Sidebar";
import useMatchSomeRoute from "hooks/useMatchSomeRoute";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { disabledSidebarRoutes, menuItems } from "./constants";
import BasicInfo from "./routes/BasicInfo";
import Branding from "./routes/Branding";
import PageDetails from "./routes/PageDetails";
import Payment from "./routes/Payment";
import Review from "./routes/Review";
import SelectWorkType from "./routes/SelectWorkType";
import ThankYou from "./routes/ThankYou";
import WebsitePurpose from "./routes/WebsitePurpose";
import WorkItems from "./routes/WorkItems";
import store from "./store";
import styles from "./styles/main.module.scss";

export default function Root() {
  useEffect(() => {
    disableSidebarForRoute("/self-service");
    disableSidebarForRoute("/self-service/basic-info");
    disableSidebarForRoute("/self-service/website-purpose");
    disableSidebarForRoute("/self-service/page-details");
    disableSidebarForRoute("/self-service/branding");
    disableSidebarForRoute("/self-service/review");
    disableSidebarForRoute("/self-service/payment");
    disableSidebarForRoute("/self-service/thank-you");
    disableSidebarForRoute("/self-service/work-items");
  }, []);

  const isSideBarDisabled = useMatchSomeRoute(disabledSidebarRoutes);

  useEffect(() => {
    if (isSideBarDisabled) {
      document.documentElement.style.setProperty("--sideBarWidth", 0);
      document.documentElement.style.setProperty("--mainContentMargin", 0);
    } else {
      document.documentElement.style.setProperty("--sideBarWidth", "104px");
      document.documentElement.style.setProperty("--mainContentMargin", "21px");
    }
  }, [isSideBarDisabled]);

  return (
    <div className={styles["topcoder-micro-frontends-self-service-app"]}>
      <Provider store={store}>
        <Router>
          <BasicInfo path="/self-service/basic-info" />
          <WebsitePurpose path="/self-service/website-purpose" />
          <PageDetails path="/self-service/page-details" />
          <Branding path="/self-service/branding" />
          <Review path="/self-service/review" />
          <Payment path="/self-service/payment" />
          <ThankYou path="/self-service/thank-you" />
          <WorkItems path="/self-service/work-items/:workItemId" />
          <SelectWorkType default noThrow path="/self-service" />
        </Router>
        {!isSideBarDisabled && (
          <div className={styles["sidebar-wrapper"]}>
            <Sidebar menus={menuItems} />
          </div>
        )}
      </Provider>
    </div>
  );
}
