import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "@reach/router";
import LoadingSpinner from "components/LoadingSpinner";
import Dashboard from "./components/Dashboard";
import {
  getIsLoggedIn,
  getIsLoggingIn,
} from "hoc/withAuthentication/selectors";
import { checkIfLoggedIn } from "hoc/withAuthentication/thunks";
import { getWorksIsLoading } from "selectors/myWork";
import { loadWorks } from "thunks/myWork";
import { ROUTES } from "constants/index.js";
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
      navigate(ROUTES.INTAKE_FORM);
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
