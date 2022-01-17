/**
 * `progress` reducer
 */

import { ACTIONS } from "constants/";

const initialState = {
  triggered: false,
  cookieCleared: false,
  initErrored: null,
};

const autoSaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.AUTO_SAVE.TRIGGER_AUTO_SAVE:
      return {
        ...state,
        triggered: action.payload,
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
