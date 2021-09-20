import { combineReducers } from "redux";
import { authSlice } from "./slices/auth";
import { typeDescriptorsSlice } from "./slices/type-descriptors";

export const reducer = combineReducers({
  auth: authSlice.reducer,
  typeDescriptors: typeDescriptorsSlice.reducer,
});
