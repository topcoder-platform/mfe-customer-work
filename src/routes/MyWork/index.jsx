import { navigate } from "@reach/router";
import LoadingSpinner from "components/LoadingSpinner";
import { ROUTES } from "constants/index.js";
import React, { useContext, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import "./styles.module.scss";

import { workContext, profileContext } from '../../../src-ts/lib'

/**
 * Dashboard's route component.
 *
 * @returns {JSX.Element}
 */
const MyWork = () => {

  const workContextData = useContext(workContext)
  const profileContextData = useContext(profileContext)

  const isLoggedIn = profileContextData.initialized && !!profileContextData.profile;
  const isLoggingIn = !profileContextData.initialized; 
  const worksIsLoading = !workContextData.initialized;

  useEffect(() => {
    if (!isLoggingIn && !isLoggedIn) {
      navigate(ROUTES.HOME_PAGE);
    }
  }, [isLoggedIn, isLoggingIn]);

  return (
    <div styleName="container">
      {isLoggedIn && !worksIsLoading ? (
        <Dashboard />
      ) : (
        <LoadingSpinner show={true} />
      )}
    </div>
  );
};

export default MyWork;
