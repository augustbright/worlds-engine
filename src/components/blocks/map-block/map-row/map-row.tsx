import React, { useCallback } from "react";
import FieldInput from "components/blocks/field-input";

type OwnProps<T> = {
  name: string;
  value: T;
  renderValue: (value: T) => React.ReactElement;
};

const MapRow = <T,>({
  name,
  renderValue,
  value,
}: OwnProps<T>): React.ReactElement => {
  const onChangeName = useCallback((newName: string) => {
    console.log(newName);
  }, []);

  return (
    <>
      <FieldInput value={name} onChange={onChangeName}/>
      <span> : </span>
      {renderValue(value)}
    </>
  );
};

export default MapRow;
