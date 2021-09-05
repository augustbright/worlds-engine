import { put, fork, call, take } from "redux-saga/effects";
import { initApplication } from "state/actions/common";
import { authSlice } from "state/slices/auth";
import { watchAuth } from "./auth";

export function* init() {
  yield put(authSlice.actions.init());
}

export function* watchInit() {
  while (true) {
    yield take(initApplication);
    yield call(init);
  }
}

export function* rootSaga() {
  yield fork(watchAuth);
  yield fork(watchInit);
}
