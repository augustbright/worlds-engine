import { AddItem } from "components/common/add-item";
import { Space } from "components/theming/types";
import { fromThemeProp } from "components/theming/utils";
import { useOwnPackages, useUpdateOwnPackage } from "hook/packages";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Package } from "types/packages";
import { PackageCard } from "./package-card";
import { PackageDetails } from "./package.details";

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const ContainerSide = styled.div`
  display: flex;
  flex: 0 0 50%;
  justify-content: center;
  align-items: center;
`;

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

export const PackagesHome: React.FC = () => {
  const ownPackagesQuery = useOwnPackages();
  const ownPackages = ownPackagesQuery.data || [];
  const [focusedPackage, setFocusedPackage] = useState<Package | null>(null);
  const mapFn = useCallback(
    (packageDescriptor) => (
      <StyledPackageCard
        onMouseEnter={() => setFocusedPackage(packageDescriptor)}
        onMouseLeave={() =>
          setFocusedPackage((currentFocusedPackage) => {
            if (currentFocusedPackage === packageDescriptor) return null;
            return currentFocusedPackage;
          })
        }
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
    <Container>
      <ContainerSide>
        <ListContainer>
          {ownPackages.map(mapFn)}
          <NewPackageContainer>
            <AddItem onNewItem={handleNewItem}>Package</AddItem>
          </NewPackageContainer>
        </ListContainer>
      </ContainerSide>
      <ContainerSide>
        {focusedPackage ? (
          <PackageDetails packageDescriptor={focusedPackage} />
        ) : null}
      </ContainerSide>
    </Container>
  );
};
