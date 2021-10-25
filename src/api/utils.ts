import { AxiosRequestConfig } from "axios";

export const setToken = (token: string) => {
  localStorage.setItem("JWT", token);
};

export const unsetToken = () => {
  localStorage.removeItem("JWT");
};

export const getToken = () => localStorage.getItem("JWT");

export const withToken = (params: AxiosRequestConfig = {}) => ({
  ...params,
  headers: {
    ...(params.headers || {}),
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getApi = () => `/api`;
