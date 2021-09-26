import axios from "axios";
import { UseQueryOptions } from "react-query";
import { ProfileFormValues, User } from "types/common";
import { GoogleOAuthCallbackDTO } from "./types";
import { getApi, withToken } from "./utils";

export const queryUser = (): UseQueryOptions<User> => ({
  queryKey: "queryUser",
  queryFn: () =>
    axios.get(`${getApi()}/auth/user`, withToken()).then((data) => {
      return data.data;
    }),
});

export const getOwnProfile = () =>
  axios
    .get<Partial<ProfileFormValues> | null>(`${getApi()}/profile`, withToken())
    .then((data) => {
      return data.data || null;
    });

export const updateProfile = (profile: Partial<ProfileFormValues>) =>
  axios
    .post(`${getApi()}/profile`, profile, withToken())
    .then((data) => data.data);

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
