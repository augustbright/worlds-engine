import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Id } from "types/common";
import { ExternalTypeDescriptor, TypeDescriptor } from "types/descriptors";
import { SystemRef } from "types/ref";
import { systemTypeDescriptors } from "./systemTypes";

export enum LoadingState {
  READY = "ready",
  LOADING = "loading",
  ERROR = "error",
}

export type TypeDescriptorsState = {
  descriptors: Record<Id, TypeDescriptor>;
  loading: Array<Id>;
  system: Record<SystemRef, ExternalTypeDescriptor>;
  state: LoadingState;
};

const initialState = {
  descriptors: {},
  loading: [],
  system: systemTypeDescriptors,
  state: LoadingState.READY,
} as TypeDescriptorsState;

const setLoading: CaseReducer<TypeDescriptorsState, PayloadAction<Id>> = (
  state,
  action
) => ({
  ...state,
  loading: Array.from(new Set([...state.loading, action.payload])),
});

const unsetLoading: CaseReducer<TypeDescriptorsState, PayloadAction<Id>> = (
  state,
  action
) => ({
  ...state,
  loading: state.loading.filter((item) => item !== action.payload),
});

const setDescriptors: CaseReducer<
  TypeDescriptorsState,
  PayloadAction<{ descriptors: Array<TypeDescriptor> }>
> = (state, action) => ({
  ...state,
  descriptors: Object.fromEntries(
    action.payload.descriptors.map((descriptor) => [descriptor._id, descriptor])
  ),
});

const updateDescriptor: CaseReducer<
  TypeDescriptorsState,
  PayloadAction<{ descriptor: TypeDescriptor }>
> = (state) => state;

const update: CaseReducer<
  TypeDescriptorsState,
  PayloadAction<{ descriptor: TypeDescriptor }>
> = (state, action) => ({
  ...state,
  descriptors: {
    ...state.descriptors,
    [action.payload.descriptor._id]: action.payload.descriptor,
  },
});

const addDescriptor: CaseReducer<
  TypeDescriptorsState,
  PayloadAction<{ descriptor: TypeDescriptor }>
> = (state, action) => ({
  ...state,
  descriptors: {
    ...state.descriptors,
    [action.payload.descriptor._id]: action.payload.descriptor,
  },
});

const deleteDescriptor: CaseReducer<
  TypeDescriptorsState,
  PayloadAction<{ id: Id }>
> = (state) => state;

const remove: CaseReducer<TypeDescriptorsState, PayloadAction<{ id: Id }>> = (
  state,
  action
) => ({
  ...state,
  descriptors: Object.fromEntries(
    Object.entries(state.descriptors).filter(([id]) => id !== action.payload.id)
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
    setLoading,
    unsetLoading,
    setState,
    setDescriptors,
    updateDescriptor,
    update,
    addDescriptor,
    deleteDescriptor,
    remove,
  },
});
