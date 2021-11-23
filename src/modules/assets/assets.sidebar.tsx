import { useOwnPackages } from "modules/packages/hook";
import { Color } from "modules/theming";
import { fromThemeProp } from "modules/theming/utils";
import React, { useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Package } from "types/packages";
import { AssetLink } from "./components/asset-link";

const Container = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  min-height: 100%;
  background: ${fromThemeProp((t) => t.colors[Color.SIDEBAR_BACKGROUND])};
`;

export const AssetsSidebar: React.FC = () => {
  const routeMatch = useRouteMatch();
  const ownPackagesQuery = useOwnPackages();
  const ownPackages = ownPackagesQuery.data || [];
  const mapFn = useCallback(
    (packageDescriptor: Package) => (
      <AssetLink to={`${routeMatch.url}/package/${packageDescriptor._id}`}>
        {packageDescriptor.name}
      </AssetLink>
    ),
    [routeMatch]
  );

  return <Container>{ownPackages.map(mapFn)}</Container>;
};
