import { CenterLayout } from "modules/abstract/components/center.layout";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AssetsPackageContent } from "./assets-package-content";
import { AssetsPlaceholderContent } from "./assets-placeholder-content";

export const AssetsContent: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <CenterLayout>
      <Switch>
        <Route exact path={`${path}/`} component={AssetsPlaceholderContent} />
        <Route
          path={`${path}/package/:packageId`}
          component={AssetsPackageContent}
        />
      </Switch>
    </CenterLayout>
  );
};
