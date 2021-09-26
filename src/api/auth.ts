import axios from "axios";
import { UseQueryOptions } from "react-query";
import { User } from "types/common";
import { GoogleOAuthCallbackDTO } from "./types";
import { getApi, withToken } from "./utils";

export const queryUser = (): UseQueryOptions<User> => ({
  queryKey: "queryUser",
  queryFn: () =>
    axios.get(`${getApi()}/auth/user`, withToken()).then((data) => {
      return data.data;
    }),
});

export const queryGoogleOAuthCallback = (
  query: string
): UseQueryOptions<GoogleOAuthCallbackDTO> => ({
  queryKey: ["queryGoogleOAuthCallback", query],
  queryFn: () =>
    axios
      .get<GoogleOAuthCallbackDTO>(`${getApi()}/auth/google/redirect${query}`)
      .then((data) => {
        return data.data;
      }),
});
