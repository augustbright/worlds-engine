import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { PackagesPage } from "./packages.page";

export const PackagesRouting: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={PackagesPage} />
    </Switch>
  );
};
