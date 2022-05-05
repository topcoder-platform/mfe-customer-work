import { navigate, Router, Redirect } from "@reach/router";
import { getAuthUserTokens } from "@topcoder/mfe-header";
import LoadingSpinner from "components/LoadingSpinner";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { decodeToken } from "tc-auth-lib";
import { autoSaveInitErrored, triggerAutoSave } from "./actions/autoSave";
import { getChallenge } from "./actions/challenge";
import { saveForm } from "./actions/form";
import { setProgressItem } from "./actions/progress";
import {
  cacheChallengeId,
  loadChallengeId,
  loadSavedFormCookie,
  setCookie,
} from "./autoSaveBeforeLogin";
import { INTAKE_FORM_ROUTES, MAX_COMPLETED_STEP } from "./constants";
import { INTAKE_FORM_ROUTES as DATA_EXPLORATION_INTAKE_FORM_ROUTES } from "./constants/products/DataExploration";
import { INTAKE_FORM_ROUTES as FIND_ME_DATA_INTAKE_FORM_ROUTES } from "./constants/products/FindMeData";
import {
  authUserError,
  authUserSuccess,
} from "./hoc/withAuthentication/actions";
import { getIntakeFormChallenges } from "services/challenge";
import BasicInfo from "./routes/BasicInfo";
import Branding from "./routes/Branding";
import PageDetails from "./routes/PageDetails";
import Payment from "./routes/Payment";
import Review from "./routes/Review";
import SelectWorkType from "./routes/SelectWorkType";
import ThankYou from "./routes/ThankYou";
import WebsitePurpose from "./routes/WebsitePurpose";
import LoginPrompt from "./routes/LoginPrompt";
import DataExploration from "./routes/Products/DataExploration";
import WebsiteDesignBanner from "components/Banners/WebsiteDesignBanner";
import FindMeData from "./routes/Products/FindMeData";

export default function IntakeForm() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onReload = (event) => {
    getAuthUserTokens()
      .then((auth) => {
        if (auth?.tokenV3) {
          event.preventDefault();
          event.returnValue = "";
        }
      })
      .catch((error) => {
        setCookie(MAX_COMPLETED_STEP, "", -1);
        authUserError(error);
      });
    dispatch(triggerAutoSave(true));
  };

  useEffect(() => {
    setIsLoading(true);
    setCookie(MAX_COMPLETED_STEP, "", -1);
    setUpAutoSave()
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        dispatch(autoSaveInitErrored(e));
      });

    window.addEventListener("beforeunload", onReload);
    return () => {
      window.removeEventListener("beforeunload", onReload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToUnfinishedStep = (currentStep, workType) => {
    if (currentStep - 1 >= 0) {
      if (workType === "Website Design") {
        navigate(INTAKE_FORM_ROUTES[currentStep - 1]);
      } else {
        if (workType === "Data Exploration") {
          navigate(DATA_EXPLORATION_INTAKE_FORM_ROUTES[currentStep - 1]);
        } else {
          navigate(FIND_ME_DATA_INTAKE_FORM_ROUTES[currentStep - 1]);
        }
      }
    }
  };

  const setUpAutoSave = async () => {
    const { handle } = await getAuth();
    if (handle) {
      await handleAutoSaveLoggedIn(handle);
      setIsLoggedIn(true);
    } else {
      handleAutoSavedLoggedOut();
    }
    return;
  };

  const handleAutoSaveLoggedIn = async (handle) => {
    const challengeDetail = await receiveChallengeDetail(handle);
    const dataToSync = await getSavedDataAfterLoggedIn(challengeDetail);
    syncSavedData(dataToSync);
  };

  const receiveChallengeDetail = async (handle) => {
    const challengeId = loadChallengeId();
    if (!challengeId) return undefined;
    return getIntakeFormChallenges(handle, challengeId)
      .then((challengeDetail) => {
        const savedChallenge = challengeDetail
          ? _.find(challengeDetail, (c) => c.status === "New")
          : undefined;
        if (savedChallenge) {
          dispatch(getChallenge(savedChallenge));
          cacheChallengeId(savedChallenge.id);
        }
        return savedChallenge;
      })
      .catch((e) => {
        dispatch(autoSaveInitErrored(e));
      });
  };

  const getSavedDataAfterLoggedIn = async (challengeDetail) => {
    const savedCookie = loadSavedFormCookie();
    return dataSyncWithoutCookie(challengeDetail) || savedCookie || {};
  };

  const dataSyncWithoutCookie = (challengeDetail) => {
    const metaData = challengeDetail?.metadata;
    const savedForm = metaData
      ? _.find(metaData, (m) => m.name === "intake-form")
      : {};
    return _.isString(savedForm?.value)
      ? JSON.parse(savedForm?.value)
      : undefined;
  };

  const syncSavedData = (savedData) => {
    if (!savedData) return;
    const { form, progress } = savedData;
    if (form) dispatch(saveForm(form));
    if (progress?.currentStep) {
      dispatch(setProgressItem(progress.currentStep));
      goToUnfinishedStep(
        progress.currentStep,
        _.get(form, "workType.selectedWorkType")
      );
    }
  };

  const handleAutoSavedLoggedOut = () => {
    const savedFormCookie = loadSavedFormCookie();
    syncSavedData(savedFormCookie);
  };

  const getAuth = async () => {
    let auth = {};
    try {
      const { tokenV3 } = await getAuthUserTokens();
      if (!!tokenV3) {
        const tokenData = decodeToken(tokenV3);
        const authProps = ["userId", "handle", "roles"];
        dispatch(authUserSuccess(_.pick(tokenData, authProps)));
        auth = tokenData;
      }
    } catch (err) {
      dispatch(authUserError(err));
    }
    return auth;
  };

  return (
    <div>
      <LoadingSpinner show={isLoading} />
      {!isLoading && (
        <Router>
          {/* Data Exploration */}
          <DataExploration
            path="/work/new/data-exploration/*"
            isLoggedIn={isLoggedIn}
          />
          {/* Find Me Data */}
          <FindMeData path="/work/new/find-me-data/*" isLoggedIn={isLoggedIn} />
          {/* Web Design */}
          <BasicInfo path="/basic-info" />
          <WebsitePurpose path="/website-purpose" />
          <PageDetails path="/page-details" />
          <LoginPrompt path="/login-prompt" isLoggedIn={isLoggedIn} />
          <Branding path="/branding" />
          <Review
            showIcon
            introText="Your Website Design project includes up to 5 unique Visual Design solutions. Each solution will match your specified scope and device types. You will receive industry-standard source files to take take forward to further design and/or development. Design deliverables will NOT include functional code."
            path="/review"
            banner={<WebsiteDesignBanner />}
            showProgress
          />
          <Payment path="/payment" showProgress />
          <ThankYou path="/thank-you" />
          <SelectWorkType path="/wizard" />
          {/* <Redirect noThrow from="/*" to="/self-service/wizard" /> */}
        </Router>
      )}
    </div>
  );
}
