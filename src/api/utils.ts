export const setToken = (token: string) => {
  localStorage.setItem("JWT", token);
};

export const getToken = () => localStorage.getItem("JWT");

// build variable
const getHost = () => APPLICATION_HOST;

export const getApi = () => `${getHost()}/api`;
