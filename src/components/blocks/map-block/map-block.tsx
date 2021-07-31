import React, { useMemo } from "react";
import ListBlock from "../list-block";
import MapRow from "./map-row";

type OwnProps<T> = {
  data: Record<string, T>;
  renderValue: (value: T) => React.ReactElement;
};

const MapBlock = <T,>({
  data,
  renderValue,
}: OwnProps<T>): React.ReactElement => {
  const dataList = useMemo(() => Object.entries(data), [data]);
  return (
    <ListBlock
      getKey={(item) => item[0]}
      bracketsType="CURLY"
      data={dataList}
      row={(item) => (
        <MapRow name={item[0]} value={item[1]} renderValue={renderValue} />
      )}
    />
  );
};

export default MapBlock;
