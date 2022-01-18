import { ACTIONS, AUTO_SAVE_FORM, CACHED_CHALLENGE_ID } from "constants/index";
import CryptoJS from "crypto-js";
import _ from "lodash";
import moment from "moment";
import "moment-timezone";
import config from "../config";
import {
  autoSaveCookieCleared,
  sendAutoSavedPatch,
  storeAutoSavedCookie,
} from "./actions/autoSave";

export const saveUpdatesMiddleware = ({ dispatch, getState }) => {
  const handleAutoSave = () => {
    const { progress, form, authUser, challenge, autoSave } = getState();
    const isEmptyForm = !form?.workType?.selectedWorkType;
    if (isEmptyForm) return;

    const challengeId = loadChallengeId() || challenge?.id;
    const dataToSave = { progress, form };
    if (authUser?.isLoggedIn && challengeId) {
      clearCachedCookie(autoSave);
      handleLoginSave(autoSave, dataToSave, challengeId, challenge);
    } else {
      dispatch(storeAutoSavedCookie(dataToSave));
    }
  };

  const clearCachedCookie = (autoSave) => {
    if (autoSave.triggered && !autoSave.cookieCleared) {
      clearAutoSavedForm();
      dispatch(autoSaveCookieCleared(true));
    }
  };

  const handleLoginSave = (autoSave, dataToSave, challengeId, challenge) => {
    const metaData = challenge?.metadata ? challenge.metadata[0] : undefined;
    const formString = JSON.stringify(dataToSave);
    if (metaData?.value !== formString) {
      dispatch(sendAutoSavedPatch(formString, challengeId));
    }
  };

  return (next) => (action) => {
    const result = next(action);
    if ([ACTIONS.AUTO_SAVE.TRIGGER_AUTO_SAVE].includes(result.type)) {
      handleAutoSave();
    }
    return result;
  };
};

export const autoSaveCookie = (stateToSave) => {
  const { progress, form } = stateToSave;
  if (progress?.currentStep && isUpdatingTheLatest(form)) {
    const newCookie = CryptoJS?.AES.encrypt(
      JSON.stringify(stateToSave),
      AUTO_SAVE_FORM
    );
    setCookie(AUTO_SAVE_FORM, newCookie, config.AUTO_SAVED_COOKIE_EXPIRED_IN);
  }
};

const isUpdatingTheLatest = (form) => {
  const cachedCookie = loadSavedFormCookie();
  const lastUpdatedAt = cachedCookie?.form?.updatedAt;
  const thisUpdatedAt = form.updatedAt;
  return !lastUpdatedAt || moment(lastUpdatedAt).isBefore(thisUpdatedAt);
};

export const loadSavedFormCookie = () => {
  try {
    const savedCookie = getCookie(AUTO_SAVE_FORM);
    if (!savedCookie) {
      return undefined;
    }
    const bytes = CryptoJS?.AES.decrypt(savedCookie, AUTO_SAVE_FORM);
    const autoSavedForm = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(autoSavedForm);
  } catch (e) {
    return undefined;
  }
};

export const clearAutoSavedForm = () => {
  setCookie(AUTO_SAVE_FORM, "", -1);
};

export const clearCachedChallengeId = () => {
  setCookie(CACHED_CHALLENGE_ID, "", -1);
};

export const loadChallengeId = () => {
  try {
    const savedId = getCookie(CACHED_CHALLENGE_ID);
    if (!savedId) {
      return undefined;
    }
    const bytes = CryptoJS?.AES.decrypt(savedId, CACHED_CHALLENGE_ID);
    const challengeId = bytes.toString(CryptoJS.enc.Utf8);
    return challengeId;
  } catch (e) {
    return undefined;
  }
};

export const cacheChallengeId = (challengeId) => {
  if (_.isString(challengeId)) {
    const encryptedId = CryptoJS.AES.encrypt(challengeId, CACHED_CHALLENGE_ID);
    setCookie(
      CACHED_CHALLENGE_ID,
      encryptedId,
      config.AUTO_SAVED_COOKIE_EXPIRED_IN
    );
  }
};

export function setCookie(cname, cvalue, exMins) {
  const cDomain = getHostDomain();

  let d = new Date();
  d.setTime(d.getTime() + exMins * 60 * 1000);

  let expires = ";expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + cDomain + expires + ";path=/";
}

export function getCookie(name) {
  const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : undefined;
}

function getHostDomain() {
  let hostDomain = "";
  if (location.hostname !== "localhost") {
    hostDomain =
      ";domain=." +
      location.hostname.split(".").reverse()[1] +
      "." +
      location.hostname.split(".").reverse()[0];
  }
  return hostDomain;
}
