/**
 * Root Redux Reducer
 */
import { combineReducers } from "redux";
import authUserReducer from "../hoc/withAuthentication/reducers";
import formReducer from "./form";
import progressReducer from "./progress";

// redux root reducer
const rootReducer = combineReducers({
  authUser: authUserReducer,
  progress: progressReducer,
  form: formReducer,
});

export default rootReducer;
