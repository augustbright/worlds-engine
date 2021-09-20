import { useSelector } from "react-redux";
import { selectAuth } from "state/selectors/auth";
import { AuthState } from "state/slices/auth";

export const useAuth = () =>
  useSelector(selectAuth) as Exclude<AuthState, null>;
