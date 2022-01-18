import { LocationProvider, createHistory } from "@reach/router";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Routes from "./routes";
import store from "./store";

// History for location provider
const history = createHistory(window);

export default function Root() {
  useEffect(() => {
    disableSidebarForRoute("/self-service/*");
  }, []);

  return (
    <LocationProvider history={history}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </LocationProvider>
  );
}
