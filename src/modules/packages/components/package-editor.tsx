import { DoubleLayout } from "modules/abstract/components/double.layout";
import React from "react";
import { Id } from "types/common";
import { PackageMainContent } from "./package-main-content";
import { PackageSecondaryContent } from "./package-secondary-content";

type Props = {
  packageId: Id;
};

export const PackageEditor: React.FC<Props> = ({ packageId }) => {
  return (
    <DoubleLayout
      main={<PackageMainContent packageId={packageId} />}
      secondary={<PackageSecondaryContent />}
    />
  );
};
