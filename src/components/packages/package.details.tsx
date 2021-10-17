import React from "react";
import { Package } from "types/packages";

type Props = {
  packageDescriptor: Package;
};

export const PackageDetails: React.FC<Props> = ({ packageDescriptor }) => {
  return <div>{packageDescriptor.name}</div>;
};
