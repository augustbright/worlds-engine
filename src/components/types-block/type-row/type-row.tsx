import FieldInput from "components/blocks/field-input";
import React, { useCallback } from "react";
import { PureTypeDescriptor, TypePureBody } from "types/descriptors";
import TypeBody from "./type-body";

type OwnProps = {
  descriptor: PureTypeDescriptor;
  onChange: (newDescriptor: PureTypeDescriptor) => void;
};

const TypeRow: React.FC<OwnProps> = ({ descriptor, onChange }) => {
  const handleChangeName = useCallback(
    (newName: string) => {
      onChange({
        ...descriptor,
        name: {
          ...descriptor.name,
          name: newName,
        },
      });
    },
    [onChange, descriptor]
  );
  const handleChangeBody = useCallback(
    (newBody: TypePureBody) => {
      onChange({
        ...descriptor,
        body: newBody,
      });
    },
    [onChange, descriptor]
  );

  return (
    <>
      <FieldInput value={descriptor.name.name} onChange={handleChangeName} />
      <span> = </span>
      <TypeBody body={descriptor.body} onChange={handleChangeBody} />
    </>
  );
};

export default TypeRow;
