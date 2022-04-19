import { navigate } from "@reach/router";
import LoadingSpinner from "components/LoadingSpinner";
import { ROUTES } from "constants/index.js";
import {
  getIsLoggedIn,
  getIsLoggingIn,
} from "hoc/withAuthentication/selectors";
import { checkIfLoggedIn } from "hoc/withAuthentication/thunks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorksIsLoading } from "selectors/myWork";
import { loadWorks, loadForumNotifications } from "thunks/myWork";
import Breadcrumb from "../../components/Breadcrumb";
import Header from "../../components/PageHeader";
import Tabs from "./components/TabComponent";

import "./style.scss";

/**
 * Dashboard's route component.
 *
 * @returns {JSX.Element}
 */
const MyWorkDetails = () => {
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
    if (isLoggedIn && !worksIsLoading) {
      dispatch(loadForumNotifications());
    }
  }, [isLoggedIn, worksIsLoading, dispatch]);

  useEffect(() => {
    if (!isLoggingIn && !isLoggedIn) {
      navigate(ROUTES.HOME_PAGE);
    }
  }, [isLoggedIn, isLoggingIn]);

  const breadcrumb = [
    {url:'/self-service/dashboard', name:"My work"},
    {url:'/self-service/details', name:"Walkie Doggie Dog Walking Service Website"}
  ];

  const onClickBtnMarkAsDone = () => {
    console.log('here')
  }


  return (
    <>
    <Breadcrumb breadcrumbItems={breadcrumb} />
    <div styleName="container">
      <Header title="Walkie Doggie Dog Walking Service Website" onClick={onClickBtnMarkAsDone} buttonContent="Mark As Done" />
      {isLoggedIn && !worksIsLoading ? (
        <div className="content">
          <div className="list-txt">
            <p className="overline">Website Design</p>
            <p className="overline cycle">Solutions Ready</p>
          </div>
          
          <Tabs></Tabs>
        </div>
      ) : (
        <LoadingSpinner show={true} />
      )}
    </div>
    </>
  );
};

export default MyWorkDetails;
