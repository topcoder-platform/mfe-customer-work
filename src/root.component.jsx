import { createHistory, LocationProvider } from "@reach/router";
import React from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import App from "./App";
import store from "./store";
import styles from "./styles/main.module.scss";
import "./styles/main.vendor.scss";

const history = createHistory(window);

export default function Root() {
  return (
    <div className={styles["topcoder-micro-frontends-self-service-app"]}>
      <LocationProvider history={history}>
        <Provider store={store}>
          <App />
          <ReduxToastr
            timeOut={5000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </Provider>
      </LocationProvider>
    </div>
  );
}
