import { navigate } from "@reach/router";
import LoadingSpinner from "components/LoadingSpinner";
import { ROUTES } from "constants/index.js";
import {
  getIsLoggedIn,
  getIsLoggingIn,
} from "hoc/withAuthentication/selectors";
import { checkIfLoggedIn } from "hoc/withAuthentication/thunks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorksIsLoading } from "selectors/myWork";
import { loadWorks } from "thunks/myWork";
import Dashboard from "./components/Dashboard";
import "./styles.module.scss";

/**
 * Dashboard's route component.
 *
 * @returns {JSX.Element}
 */
const MyWork = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoggingIn = useSelector(getIsLoggingIn);
  const worksIsLoading = useSelector(getWorksIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIfLoggedIn());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadWorks());
    }
  }, [isLoggedIn, dispatch]);

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
