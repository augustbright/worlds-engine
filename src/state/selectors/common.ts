import { createSelector } from "@reduxjs/toolkit";
import { selectIsAuthReady } from "./auth";

export const selectIsApplicationReady = createSelector(
  selectIsAuthReady,
  (authReady) => authReady
);
