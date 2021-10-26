import { PackagesRouting } from "modules/packages/components/packages.routing";
import { AuthPage } from "pages/auth-page";
import { MainPage } from "pages/main-page";
import { ProfilePage } from "pages/profile-page";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ApplicationPage } from "./application-page";
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
      <ApplicationPage>
        <PackagesRouting />
      </ApplicationPage>
    </PrivateRoute>
    <PrivateRoute exact path="/profile">
      <ProfilePage />
    </PrivateRoute>
  </Switch>
);
