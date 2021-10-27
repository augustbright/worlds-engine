import { PackageEditor } from "modules/packages/components/package-editor";
import React from "react";
import { useParams } from "react-router-dom";

export const AssetsPackageContent: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  return <PackageEditor packageId={packageId} />;
};
