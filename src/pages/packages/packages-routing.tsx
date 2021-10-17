import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { PackagesHomePage } from "./packages-home-page";
import { PackagesEditPage } from "./packages-edit-page";
import { PageLayout } from "../layout/page";

export const PackagesRouting: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <PageLayout>
      <Switch>
        <Route exact path={path} component={PackagesHomePage} />
        <Route exact path={`${path}/:packageId`} component={PackagesEditPage} />
      </Switch>
    </PageLayout>
  );
};
