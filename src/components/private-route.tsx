import { useAuth } from "hook/auth";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute: React.FC<Record<string, unknown>> = ({
  children,
  ...rest
}) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
