import React, { useState, useLayoutEffect } from "react";
import { Router, Redirect } from "@reach/router";
import { menuItems } from "./constants";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";
import Sidebar from "components/Sidebar";
import BasicInfo from "./routes/BasicInfo";
import Branding from "./routes/Branding";
import PageDetails from "./routes/PageDetails";
import Payment from "./routes/Payment";
import Review from "./routes/Review";
import SelectWorkType from "./routes/SelectWorkType";
import ThankYou from "./routes/ThankYou";
import WebsitePurpose from "./routes/WebsitePurpose";
import WorkItems from "./routes/WorkItems";
import Layout from "components/Layout";

import "react-responsive-modal/styles.css";

import styles from "./styles/main.module.scss";

const sidebar = <Sidebar menus={menuItems} />;

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useLayoutEffect(() => {
    const checkIsLoggedIn = async () => {
      const { tokenV3 } = await getAuthUserTokens();
      setIsLoggedIn(!!tokenV3);
    };
    checkIsLoggedIn();
  }, []);

  if (isLoggedIn == null) {
    return null;
  }

  return (
    <div className={styles["topcoder-micro-frontends-self-service-app"]}>
      <Router>
        {isLoggedIn ? (
          <Layout
            path="/self-service/work-items/:workItemId"
            sidebar={sidebar}
            PageComponent={WorkItems}
          />
        ) : (
          <>
            <SelectWorkType path="/self-service/wizard" />
            <BasicInfo path="/self-service/basic-info" />
            <WebsitePurpose path="/self-service/website-purpose" />
            <PageDetails path="/self-service/page-details" />
            <Branding path="/self-service/branding" />
            <Review path="/self-service/review" />
            <Payment path="/self-service/payment" />
            <ThankYou path="/self-service/thank-you" />
          </>
        )}
        <Redirect
          from="/self-service/*"
          to={isLoggedIn ? "/self-service" : "/self-service/wizard"}
          noThrow
        />
      </Router>
    </div>
  );
};

export default Routes;
