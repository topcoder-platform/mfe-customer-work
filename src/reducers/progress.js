/**
 * `progress` reducer
 */

import { ACTIONS } from "constants/";

const initialState = {
  currentStep: 0,
};

const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.PROGRESS.SET_ITEM:
      return {
        ...state,
        currentStep: action.payload,
      };
    default:
      return state;
  }
};

export default progressReducer;
