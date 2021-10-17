import { PrivateRoute } from "components/private-route";
import { AuthPage } from "pages/auth-page";
import { MainPage } from "pages/main-page";
import { PackagesRouting } from "pages/packages/packages-routing";
import { ProfilePage } from "pages/profile-page";
import { TestPage } from "pages/test-page";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const RoutingRoot: React.FC = () => (
  <Router>
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
  </Router>
);
