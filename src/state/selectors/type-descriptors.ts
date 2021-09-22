import { createSelector } from "@reduxjs/toolkit";
import { State } from "state/types";

const selectSelf = (state: State) => state;

export const selectTypeDescriptors = createSelector(
  selectSelf,
  ({ typeDescriptors }) => typeDescriptors.descriptors
);

export const selectSystemDescriptors = createSelector(
  selectSelf,
  ({ typeDescriptors }) => typeDescriptors.system
);
