import React from "react";

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
  return (
    <>
      <span>{name}</span>
      <span> : </span>
      {renderValue(value)}
    </>
  );
};

export default MapRow;
