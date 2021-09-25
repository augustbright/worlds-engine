import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSystemTypeDescriptors } from "func/system";
import { Id } from "types/common";
import {
  NotFoundDescriptor,
  SystemTypeDescriptor,
  TypeDescriptor,
} from "types/descriptors";
import { SystemRef } from "types/ref";

export enum LoadingState {
  READY = "ready",
  LOADING = "loading",
  ERROR = "error",
}

export type TypeDescriptorsState = {
  descriptors: Record<Id, TypeDescriptor>;
  external: Record<Id, TypeDescriptor | NotFoundDescriptor>;
  loading: Array<Id>;
  system: Record<SystemRef, SystemTypeDescriptor>;
  state: LoadingState;
};

const initialState = {
  descriptors: {},
  external: {},
  loading: [],
  system: getSystemTypeDescriptors(),
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

const requireId: CaseReducer<TypeDescriptorsState, PayloadAction<Id>> = (
  state
) => state;

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

const addExternal: CaseReducer<
  TypeDescriptorsState,
  PayloadAction<{ id: Id; descriptor: TypeDescriptor | NotFoundDescriptor }>
> = (state, action) => ({
  ...state,
  external: {
    ...state.external,
    [action.payload.id]: action.payload.descriptor,
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
    requireId,
    setState,
    setDescriptors,
    updateDescriptor,
    update,
    addDescriptor,
    addExternal,
    deleteDescriptor,
    remove,
  },
});
