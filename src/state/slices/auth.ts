import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  jwt: string;
}

export type AuthState = {
  isLoggedIn?: boolean;
  user?: User;
} | null;

const initialState = null as AuthState;

const setAuth: CaseReducer<
  AuthState,
  PayloadAction<{ user?: User; isLoggedIn: boolean }>
> = (state, action) => ({
  ...state,
  user: action.payload.user,
  isLoggedIn: action.payload.isLoggedIn,
});

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    init: (state) => state,
    setAuth,
  },
});
