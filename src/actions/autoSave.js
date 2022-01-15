import { ACTIONS } from "../constants";
import { autoSaveCookie } from "../autoSaveBeforeLogin";
import { getChallenge } from "../actions/challenge";
import { patchChallenge } from "services/challenge";

export const autoSaveInitErrored = (error) => ({
  type: ACTIONS.AUTO_SAVE.INIT_ERRORED,
  payload: error,
});

export const triggerAutoSave = (isTriggered) => ({
  type: ACTIONS.AUTO_SAVE.TRIGGER_AUTO_SAVE,
  payload: isTriggered,
});

export const autoSaveCookieCleared = (isCookieCleared) => ({
  type: ACTIONS.AUTO_SAVE.COOKIE_CLEARED,
  payload: isCookieCleared,
});

export const sendAutoSavedPatch = (dataToSave, challengeId) => (dispatch) => {
  patchChallenge(dataToSave, challengeId)
    .then((patched) => {
      dispatch(getChallenge(patched));
    })
    .catch((e) => {});
};

export const storeAutoSavedCookie = (dataToSave) => (dispatch) => {
  autoSaveCookie(dataToSave);
};
