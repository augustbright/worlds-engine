import { CenterLayout } from "modules/abstract/components/center.layout";
import { Placeholder } from "modules/abstract/components/placeholder";
import React from "react";

export const PackageSecondaryContent: React.FC = () => {
  return (
    <CenterLayout>
      <Placeholder>Select an asset or create a new one</Placeholder>
    </CenterLayout>
  );
};
