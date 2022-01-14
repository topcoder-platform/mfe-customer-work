import React from "react";
import { createHistory, LocationProvider } from "@reach/router";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import styles from "./styles/main.module.scss";

const history = createHistory(window);

export default function Root() {
  return (
    <div className={styles["topcoder-micro-frontends-self-service-app"]}>
      <LocationProvider history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </LocationProvider>
    </div>
  );
}
