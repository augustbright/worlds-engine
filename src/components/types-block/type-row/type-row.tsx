import FieldInput from "components/blocks/field-input";
import ParamsList from "components/params-list";
import React, { useCallback } from "react";
import { PureTypeDescriptor } from "types/descriptors";
import TypeBody from "./type-body";

type OwnProps = {
  descriptor: PureTypeDescriptor;
};

const TypeRow: React.FC<OwnProps> = ({ descriptor }) => {
  const onChangeName = useCallback((newName: string) => {
    console.log(newName);
  }, []);

  return (
    <>
      <FieldInput value={descriptor.name} onChange={onChangeName} />
      {descriptor.params && <ParamsList params={descriptor.params} />}
      <span> = </span>
      <TypeBody body={descriptor.body} />
    </>
  );
};

export default TypeRow;
