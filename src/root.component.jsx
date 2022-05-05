import { createHistory, LocationProvider } from "@reach/router";
import { disableSidebarForRoute } from "@topcoder/mfe-header";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { toast, ToastContainer } from "react-toastify";

import App from "./App";
import store from "./store";

import "./styles/main.vendor.scss";

const history = createHistory(window);

export default function Root() {
  useEffect(() => {
    disableSidebarForRoute("/self-service/*");
  }, []);

  return (
    <LocationProvider history={history}>
      <Provider store={store}>
        <App />
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          getState={(state) => state.toastr}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </LocationProvider>
  );
}
