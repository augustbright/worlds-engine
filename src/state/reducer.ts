import { combineReducers } from "redux";
import { authSlice } from "./slices/auth";

export const reducer = combineReducers({
  auth: authSlice.reducer,
});
