/**
 * Reducer for `authUser`
 */
import { ACTION_TYPE } from "constants";
import _ from "lodash";

const initialState = {
  isLoggedIn: undefined,
  userId: undefined,
  handle: undefined,
  roles: [],
  authError: undefined,
};

const authInitialState = _.pick(initialState, [
  "isLoggedIn",
  "userId",
  "handle",
  "roles",
  "authError",
]);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.AUTH_USER_SUCCESS:
      return {
        ...state,
        ...authInitialState,
        ...action.payload,
        isLoggedIn: true,
      };

    case ACTION_TYPE.AUTH_USER_ERROR:
      return {
        ...state,
        ...authInitialState,
        authError: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
