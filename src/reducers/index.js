/**
 * Root Redux Reducer
 */
import { combineReducers } from "redux";
import authUserReducer from "../hoc/withAuthentication/reducers";
import formReducer from "./form";
import progressReducer from "./progress";
import workReducer from "./work";

// redux root reducer
const rootReducer = combineReducers({
  authUser: authUserReducer,
  progress: progressReducer,
  form: formReducer,
  work: workReducer,
});

export default rootReducer;
