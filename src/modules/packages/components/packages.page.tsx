import { DoubleLayout } from "modules/abstract/components/double.layout";
import { useQueryParameters } from "modules/abstract/hook/common";
import { PackagesFetch } from "modules/packages/components/packages.fetch";
import React from "react";
import { PackageFetch } from "./package.fetch";

export const PackagesPage: React.FC = () => {
  const parameters = useQueryParameters();
  const packageId = parameters.get("packageId");

  return (
    <DoubleLayout
      main={<PackagesFetch />}
      secondary={packageId ? <PackageFetch id={packageId} /> : null}
    />
  );
};
