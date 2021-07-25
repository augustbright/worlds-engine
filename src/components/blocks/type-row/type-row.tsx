import React from "react";
import { PureTypeDescriptor } from "types/descriptors";

type OwnProps = {
  descriptor: PureTypeDescriptor;
};

const TypeRow: React.FC<OwnProps> = ({ descriptor }) => {
  return (
    <>
      <span>type</span>
      <span>{descriptor.name}</span>
    </>
  );
};

export default TypeRow;
