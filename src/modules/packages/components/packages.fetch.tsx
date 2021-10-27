import { Space } from "modules/theming/types";
import { fromThemeProp } from "modules/theming/utils";
import { useOwnPackages, useUpdateOwnPackage } from "modules/packages/hook";
import React, { useCallback } from "react";
import styled from "styled-components";
import { AddItem } from "modules/common/components/add-item";
import { PackageCard } from "./package-card";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPackageCard = styled(PackageCard)`
  &:not(:first-child) {
    margin-top: ${fromThemeProp((t) => t.space[Space.MEDIUM])};
  }
`;

const NewPackageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${fromThemeProp((t) => t.space[Space.MEDIUM])};
`;

export const PackagesFetch: React.FC = () => {
  const ownPackagesQuery = useOwnPackages();
  const ownPackages = ownPackagesQuery.data || [];
  const mapFn = useCallback(
    (packageDescriptor) => (
      <StyledPackageCard
        key={packageDescriptor._id}
        packageDescriptor={packageDescriptor}
      />
    ),
    []
  );
  const updateOwnPackage = useUpdateOwnPackage();
  const handleNewItem = useCallback(
    (name: string) => {
      if (!name) return;

      updateOwnPackage.mutate({
        name,
      });
    },
    [updateOwnPackage]
  );

  return (
    <ListContainer>
      {ownPackages.map(mapFn)}
      <NewPackageContainer>
        <AddItem onNewItem={handleNewItem}>Package</AddItem>
      </NewPackageContainer>
    </ListContainer>
  );
};
