import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Id } from "types/common";
import { TypeDescriptor } from "types/descriptors";

export enum LoadingState {
  READY = "ready",
  LOADING = "loading",
  ERROR = "error",
}

export type TypeDescriptorsState = {
  descriptors: Record<Id, TypeDescriptor>;
  state: LoadingState;
};

const initialState = {
  descriptors: {},
  state: LoadingState.READY,
} as TypeDescriptorsState;

const setDescriptors: CaseReducer<
  TypeDescriptorsState,
  PayloadAction<{ descriptors: Array<TypeDescriptor> }>
> = (state, action) => ({
  ...state,
  descriptors: Object.fromEntries(
    action.payload.descriptors.map((descriptor) => [descriptor._id, descriptor])
  ),
});

const setState: CaseReducer<
  TypeDescriptorsState,
  PayloadAction<{
    state: LoadingState;
  }>
> = (state, action) => ({
  ...state,
  state: action.payload.state,
});

export const typeDescriptorsSlice = createSlice({
  initialState,
  name: "typeDescriptors",
  reducers: {
    load: (state) => state,
    setState,
    setDescriptors,
  },
});
