import { PackagesRouting } from "modules/packages/components/packages.routing";
import { AuthPage } from "pages/auth-page";
import { MainPage } from "pages/main-page";
import { ProfilePage } from "pages/profile-page";
import { TestPage } from "pages/test-page";
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
    <PrivateRoute path="/packages">
      <PackagesRouting />
    </PrivateRoute>
    <PrivateRoute exact path="/profile">
      <ProfilePage />
    </PrivateRoute>
    <PrivateRoute exact path="/test">
      <TestPage />
    </PrivateRoute>
  </Switch>
);
