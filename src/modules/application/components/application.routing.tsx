import { AssetsPage } from "modules/assets/assets.page";
import { AuthPage } from "pages/auth-page";
import { MainPage } from "pages/main-page";
import { ProfilePage } from "pages/profile-page";
import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { PrivateRoute } from "./private-route";

export const ApplicationRouting: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Redirect exact from="/" to="/assets" />
      <Route path="/login">
        <AuthPage />
      </Route>
      <PrivateRoute exact path="/">
        <MainPage />
      </PrivateRoute>
      <PrivateRoute path="/assets">
        <AssetsPage />
      </PrivateRoute>
      <PrivateRoute exact path="/profile">
        <ProfilePage />
      </PrivateRoute>
    </Switch>
  );
};
