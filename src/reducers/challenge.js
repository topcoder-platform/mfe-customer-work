/**
 * `progress` reducer
 */

import { ACTIONS } from "constants/";

const initialState = {};

const challengeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CHALLENGE.GET_CHALLENGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default challengeReducer;
