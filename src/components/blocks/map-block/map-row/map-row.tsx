import React from "react";
import FieldInput from "components/blocks/field-input";

type OwnProps<T> = {
  name: string;
  value: T;
  renderValue: (value: T, key: string) => React.ReactElement;
  onChangeName: (newName: string) => void;
};

const MapRow = <T,>({
  name,
  renderValue,
  value,
  onChangeName,
}: OwnProps<T>): React.ReactElement => {
  return (
    <>
      <FieldInput value={name} onChange={onChangeName} />
      <span> : </span>
      {renderValue(value, name)}
    </>
  );
};

export default MapRow;
