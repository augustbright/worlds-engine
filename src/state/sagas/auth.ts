import { getUser } from "api/auth";
import { AxiosError } from "axios";
import { call, put, take } from "redux-saga/effects";
import { authSlice, User } from "state/slices/auth";

const isAxiosError = (error: AxiosError): error is AxiosError =>
  error.isAxiosError;

export function* watchAuth() {
  while (true) {
    yield take(authSlice.actions.init);
    try {
      const user: User = yield call(getUser);
      yield put(
        authSlice.actions.setAuth({
          isLoggedIn: true,
          user,
        })
      );
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        yield put(
          authSlice.actions.setAuth({
            isLoggedIn: false,
          })
        );
      } else {
        throw error;
      }
    }
  }
}
