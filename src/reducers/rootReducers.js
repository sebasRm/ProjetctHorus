import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { eventsReducer } from "./eventsReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
});
