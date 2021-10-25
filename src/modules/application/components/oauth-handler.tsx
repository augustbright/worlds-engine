import { queryGoogleOAuthCallback } from "api/auth";
import { setToken } from "api/utils";
import { LoadingPage } from "pages/loading-page";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

export const OAuthHandler: React.FC = ({ children }) => {
  const queryClient = useQueryClient();
  const oAuthCallbackQuery = useQuery({
    ...queryGoogleOAuthCallback(window.location.search),
    enabled: window.location.pathname === "/auth/google/redirect",
  });

  if (oAuthCallbackQuery.data) {
    setToken(oAuthCallbackQuery.data.access_token);
    queryClient.invalidateQueries();
    window.location.replace("/");
    return null;
  }

  if (oAuthCallbackQuery.isLoading) {
    return <LoadingPage>Logging in</LoadingPage>;
  }

  return <>{children}</>;
};
