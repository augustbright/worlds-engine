import axios from "axios";
import { GoogleOAuthCallbackDTO } from "./types";
import { getApi, withToken } from "./utils";

export const getUser = () =>
  axios.get(`${getApi()}/auth/user`, withToken()).then((data) => {
    return data.data;
  });

export const googleOAuthCallback = (query: string) =>
  axios
    .get<GoogleOAuthCallbackDTO>(`${getApi()}/auth/google/redirect${query}`)
    .then((data) => {
      return data.data;
    });
