import { queryUser } from "api/auth";
import { LoadingPage } from "pages/loading-page";
import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

export const PrivateRoute: React.FC<Record<string, unknown>> = ({
  children,
  ...rest
}) => {
  const userQuery = useQuery({
    ...queryUser(),
    retry: false,
  });
  const render = useCallback(
    ({ location }: RouteComponentProps) => {
      if (userQuery.isLoading) {
        return <LoadingPage>User data</LoadingPage>;
      }

      if (userQuery.error) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }

      if (userQuery.data) {
        return <>{children}</>;
      }

      return null;
    },
    [userQuery, children]
  );

  return <Route {...rest} render={render} />;
};
