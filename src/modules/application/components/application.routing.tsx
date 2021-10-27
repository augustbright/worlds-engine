import { AssetsPage } from "modules/assets/assets.page";
import { AuthPage } from "pages/auth-page";
import { MainPage } from "pages/main-page";
import { ProfilePage } from "pages/profile-page";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./private-route";

export const ApplicationRouting: React.FC = () => (
  <Switch>
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
