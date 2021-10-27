import { HeaderLayout } from "modules/abstract/components/header.layout";
import { AssetHeader } from "modules/application/components/asset-header";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Id } from "types/common";
import { PackageTitle } from "./package-title";
import { PackageAssets } from "./package-assets";

type Props = {
  packageId: Id;
};

export const PackageMainContent: React.FC<Props> = ({ packageId }) => {
  const history = useHistory();
  const handleClickClose = useCallback(() => {
    history.push("/assets");
  }, [history]);

  return (
    <HeaderLayout
      header={
        <AssetHeader
          title={<PackageTitle packageId={packageId} />}
          onClose={handleClickClose}
        />
      }
      content={<PackageAssets packageId={packageId} />}
    />
  );
};
