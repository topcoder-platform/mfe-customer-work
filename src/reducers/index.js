/**
 * Root Redux Reducer
 */
import { combineReducers } from "redux";
import authUserReducer from "../hoc/withAuthentication/reducers";
import formReducer from "./form";
import myWorkReducer from "./myWork";
import progressReducer from "./progress";
import autoSaveReducer from "./autoSave";
import challengeReducer from "./challenge";

// redux root reducer
const rootReducer = combineReducers({
  authUser: authUserReducer,
  progress: progressReducer,
  form: formReducer,
  autoSave: autoSaveReducer,
  challenge: challengeReducer,
  myWork: myWorkReducer,
});

export default rootReducer;
