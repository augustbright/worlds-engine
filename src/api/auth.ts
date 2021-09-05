import axios from "axios";
import { GoogleOAuthCallbackDTO } from "./types";
import { getApi, getToken } from "./utils";

export const getUser = () =>
  axios.get(`${getApi()}/auth/user`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const googleOAuthCallback = (query: string) =>
  axios
    .get<GoogleOAuthCallbackDTO>(`${getApi()}/auth/google/redirect${query}`)
    .then((data) => {
      return data.data;
    });
