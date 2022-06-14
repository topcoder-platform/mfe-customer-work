import { patchChallenge } from "services/challenge";
import { getChallenge } from "../actions/challenge";
import { autoSaveCookie } from "../autoSaveBeforeLogin";
import { ACTIONS } from "../constants";

export const autoSaveInitErrored = (error) => ({
  type: ACTIONS.AUTO_SAVE.INIT_ERRORED,
  payload: error,
});

export const triggerAutoSave = (isTriggered, isSaveLater) => ({
  type: ACTIONS.AUTO_SAVE.TRIGGER_AUTO_SAVE,
  payload: {
    isTriggered,
    isSaveLater
  },
});

export const resetSaveLater = () => ({
  type: ACTIONS.AUTO_SAVE.RESET_IS_SAVE_LATER,
  payload: false
});

export const autoSaveCookieCleared = (isCookieCleared) => ({
  type: ACTIONS.AUTO_SAVE.COOKIE_CLEARED,
  payload: isCookieCleared,
});

export const sendAutoSavedPatch = (dataToSave, challengeId) => (dispatch) => {
  return patchChallenge(dataToSave, challengeId)
    .then((patched) => {
      dispatch(getChallenge(patched));
    })
    .catch((e) => {});
};

export const storeAutoSavedCookie = (dataToSave) => (dispatch) => {
  autoSaveCookie(dataToSave);
};
