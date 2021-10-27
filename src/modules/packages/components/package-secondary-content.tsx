import { TypeContent } from "modules/types/components/type-content";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { PackageSecondaryPlaceholder } from "./packages-secondary-placeholder";

export const PackageSecondaryContent: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={PackageSecondaryPlaceholder} />
      <Route path={`${path}/type/:typeId`} component={TypeContent} />
    </Switch>
  );
};
