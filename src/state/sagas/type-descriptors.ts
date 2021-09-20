import { getTypeDescriptors } from "api/editor";
import { AxiosError } from "axios";
import { call, fork, put, take } from "redux-saga/effects";
import {
  typeDescriptorsSlice,
  LoadingState,
} from "state/slices/type-descriptors";
import { TypeDescriptor } from "types/descriptors";

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

export function* typeDescriptorsSaga() {
  yield fork(watchLoad);
}
