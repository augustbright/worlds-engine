export const setToken = (token: string) => {
  localStorage.setItem("JWT", token);
};

export const getToken = () => localStorage.getItem("JWT");

export const withToken = <T extends { headers: Record<string, unknown> }>(
  params: T | Record<string, never> = {}
) => ({
  ...params,
  headers: {
    ...(params.headers || {}),
    Authorization: `Bearer ${getToken()}`,
  },
});

// build variable
const getHost = () => APPLICATION_HOST;

export const getApi = () => `${getHost()}/api`;
