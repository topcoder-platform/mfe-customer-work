/**
 * `progress` reducer
 */

import { ACTIONS } from "constants/";

const initialState = {
  triggered: false,
  cookieCleared: false,
  initErrored: null,
  isSaveLater: false,
};

const autoSaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.AUTO_SAVE.TRIGGER_AUTO_SAVE:
      return {
        ...state,
        triggered: action.payload.isTriggered,
        isSaveLater: action.payload.isSaveLater,
      };
    case ACTIONS.AUTO_SAVE.RESET_IS_SAVE_LATER:
      return {
        ...state,
        isSaveLater: action.payload,
      };
    case ACTIONS.AUTO_SAVE.COOKIE_CLEARED:
      return {
        ...state,
        cookieCleared: action.payload,
      };
    case ACTIONS.AUTO_SAVE.INIT_ERRORED:
      return {
        ...state,
        initErrored: action.payload,
      };
    default:
      return state;
  }
};

export default autoSaveReducer;
