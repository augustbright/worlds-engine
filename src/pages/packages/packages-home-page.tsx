import { PackagesHome } from "components/packages/packages-home";
import { useOwnPackages } from "hook/packages";
import React, { useMemo } from "react";
import { LoadingPage } from "../loading-page";

export const PackagesHomePage: React.FC = () => {
  const ownPackagesQuery = useOwnPackages();
  const pageContent = useMemo(() => {
    if (ownPackagesQuery.isLoading) return <LoadingPage>Packages</LoadingPage>;

    return <PackagesHome />;
  }, [ownPackagesQuery]);

  return pageContent;
};
