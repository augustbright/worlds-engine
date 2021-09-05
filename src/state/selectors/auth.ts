import { createSelector } from "@reduxjs/toolkit";
import { State } from "state/types";

const selectSelf = (state: State) => state;

export const selectAuth = createSelector(selectSelf, ({ auth }) => auth);

export const selectIsAuthReady = createSelector(
  selectAuth,
  (auth) => auth !== null
);

export const selectIsLoggedIn = createSelector(
  selectIsAuthReady,
  selectAuth,
  (authReady, auth) => authReady && auth && auth.isLoggedIn
);
