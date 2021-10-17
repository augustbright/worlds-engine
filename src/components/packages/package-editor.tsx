import React from "react";
import { Id } from "types/common";

type Props = {
  packageId: Id;
};

export const PackageEditor: React.FC<Props> = ({ packageId }) => {
  return <div>edit {packageId}</div>;
};
