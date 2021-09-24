import React from "react";
import {
  deleteTypeDescriptor,
  getExternalType,
  getTypeDescriptors,
  updateTypeDescriptor,
} from "api/editor";
import { AxiosError } from "axios";
import { Name } from "components/editor/word/name";
import { createErrorCallback } from "func/toasts";
import { call, fork, put, select, take } from "redux-saga/effects";
import {
  typeDescriptorsSlice,
  LoadingState,
} from "state/slices/type-descriptors";
import { NotFoundDescriptor, TypeDescriptor } from "types/descriptors";
import { Id } from "types/common";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  selectExternalDescriptors,
  selectLoading,
  selectTypeDescriptors,
} from "state/selectors/type-descriptors";

const isAxiosError = (error: AxiosError): error is AxiosError =>
  error.isAxiosError;

export function* watchLoad() {
  while (true) {
    yield take(typeDescriptorsSlice.actions.load);
    try {
      yield put(
        typeDescriptorsSlice.actions.setState({ state: LoadingState.LOADING })
      );
      const descriptors: Array<TypeDescriptor> = yield call(getTypeDescriptors);
      yield put(
        typeDescriptorsSlice.actions.setState({ state: LoadingState.READY })
      );
      yield put(typeDescriptorsSlice.actions.setDescriptors({ descriptors }));
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        yield put(
          typeDescriptorsSlice.actions.setState({ state: LoadingState.ERROR })
        );
      } else {
        throw error;
      }
    }
  }
}

export function* watchUpdate() {
  while (true) {
    const {
      payload: { descriptor },
    }: PayloadAction<{ descriptor: TypeDescriptor }> = yield take(
      typeDescriptorsSlice.actions.updateDescriptor
    );
    const currentDescriptors: Record<Id, TypeDescriptor> = yield select(
      selectTypeDescriptors
    );
    const initialDescriptor = currentDescriptors[descriptor._id];
    yield put(typeDescriptorsSlice.actions.update({ descriptor }));

    yield put(typeDescriptorsSlice.actions.setLoading(descriptor._id));
    try {
      yield call(updateTypeDescriptor, descriptor);
    } catch (error) {
      yield put(
        typeDescriptorsSlice.actions.update({ descriptor: initialDescriptor })
      );
      createErrorCallback({
        message: "Failed to update type",
        name: <Name>{descriptor.name}</Name>,
      })(error);
    } finally {
      yield put(typeDescriptorsSlice.actions.unsetLoading(descriptor._id));
    }
  }
}

export function* watchRemove() {
  while (true) {
    const {
      payload: { id },
    }: PayloadAction<{ id: Id }> = yield take(
      typeDescriptorsSlice.actions.deleteDescriptor
    );
    const currentDescriptors: Record<Id, TypeDescriptor> = yield select(
      selectTypeDescriptors
    );
    const initialDescriptor = currentDescriptors[id];
    yield put(
      typeDescriptorsSlice.actions.update({
        descriptor: {
          _id: id,
          name: "",
          body: initialDescriptor.body,
        },
      })
    );

    yield put(typeDescriptorsSlice.actions.setLoading(id));
    try {
      yield call(deleteTypeDescriptor, id);
      yield put(typeDescriptorsSlice.actions.remove({ id }));
    } catch (error) {
      yield put(
        typeDescriptorsSlice.actions.update({ descriptor: initialDescriptor })
      );
      createErrorCallback({
        message: "Failed to delete type",
      })(error);
    } finally {
      yield put(typeDescriptorsSlice.actions.unsetLoading(id));
    }
  }
}

export function* watchRequire() {
  while (true) {
    const { payload: id }: PayloadAction<Id> = yield take(
      typeDescriptorsSlice.actions.requireId
    );
    const externalDescriptors: Record<Id, TypeDescriptor | NotFoundDescriptor> =
      yield select(selectExternalDescriptors);
    const loading: Array<Id> = yield select(selectLoading);
    if (id in externalDescriptors || loading.includes(id)) {
      // noop
    } else {
      yield put(typeDescriptorsSlice.actions.setLoading(id));
      try {
        const externalType: TypeDescriptor | null = yield call(
          getExternalType,
          id
        );
        yield put(
          typeDescriptorsSlice.actions.addExternal({
            id,
            descriptor: externalType || {
              error: new Error("Descriptor doesn't exist"),
            },
          })
        );
      } catch (error) {
        yield put(
          typeDescriptorsSlice.actions.addExternal({
            id,
            descriptor: {
              error,
            },
          })
        );
        createErrorCallback({
          message: "Failed to get type",
          name: id,
        })(error);
      } finally {
        yield put(typeDescriptorsSlice.actions.unsetLoading(id));
      }
    }
  }
}

export function* typeDescriptorsSaga() {
  yield fork(watchLoad);
  yield fork(watchUpdate);
  yield fork(watchRemove);
  yield fork(watchRequire);
}
