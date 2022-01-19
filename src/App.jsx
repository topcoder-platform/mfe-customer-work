import { Redirect, Router } from "@reach/router";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";
import Sidebar from "components/Sidebar";
import React, { useLayoutEffect, useState } from "react";
import { menuItems } from "./constants";
import IntakeForm from "./IntakeForm";
import Home from "./routes/Home";
import MyWork from "./routes/MyWork";
import Profile from "./routes/Profile";
import WorkItems from "./routes/WorkItems";
import Layout from "components/Layout";

import "react-responsive-modal/styles.css";

import styles from "./styles/main.module.scss";

const sidebar = <Sidebar menus={menuItems} />;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // useEffect(() => {
  //   disableSidebarForRoute("/self-service/*");
  //   disableNavigationForRoute("/self-service/*");
  // }, []);

  useLayoutEffect(() => {
    const checkIsLoggedIn = async () => {
      const { tokenV3 } = await getAuthUserTokens();
      setIsLoggedIn(!!tokenV3);
    };
    checkIsLoggedIn();
    document.documentElement.style.setProperty("--navbarHeight", "80px");
    return () => {
      // --navbarHeight must be set to its default value,
      // removeProperty won't work
      document.documentElement.style.setProperty("--navbarHeight", "60px");
    };
  }, []);

  if (isLoggedIn == null) {
    return null;
  }

  return (
    <div className={styles["topcoder-micro-frontends-self-service-app"]}>
      <Router>
        {!isLoggedIn && <IntakeForm path="/self-service/*" />}
        {isLoggedIn && (
          <>
            <Layout
              path="/self-service"
              sidebar={sidebar}
              PageComponent={MyWork}
            />
            <Layout
              path="/self-service/work-items/:workItemId"
              sidebar={sidebar}
              PageComponent={WorkItems}
            />
            <Redirect noThrow from="/self-service/*" to="/self-service" />
          </>
        )}
        <Home path="/self-service/home" />
        <Profile path="/self-service/profile" />
      </Router>
    </div>
  );
};

export default App;
