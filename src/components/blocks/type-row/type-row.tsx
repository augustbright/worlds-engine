import React from "react";
import { PureTypeDescriptor } from "types/descriptors";
import TypeBody from "./type-body";

type OwnProps = {
  descriptor: PureTypeDescriptor;
};

const TypeRow: React.FC<OwnProps> = ({ descriptor }) => {
  return (
    <>
      <span>type </span>
      <span>{descriptor.name}</span>
      <span> = </span>
      <TypeBody body={descriptor.body} />
    </>
  );
};

export default TypeRow;
