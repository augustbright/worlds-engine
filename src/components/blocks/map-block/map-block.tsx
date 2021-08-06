import React, { useCallback, useMemo } from "react";
import ListBlock from "../list-block";
import { BracketsType } from "../with-brackets";
import MapRow from "./map-row";

type OwnProps<T> = {
  data: Record<string, T>;
  bracketsType?: BracketsType;
  renderValue: (value: T, key: string) => React.ReactElement;
  onChange: (newData: Record<string, T>) => void;
  onAdd?: () => void;
};

const MapBlock = <T,>({
  data,
  bracketsType = "CURLY",
  renderValue,
  onChange,
  onAdd,
}: OwnProps<T>): React.ReactElement => {
  const dataList = useMemo(() => Object.entries(data), [data]);
  const handleDelete = useCallback(
    (idx: number) => {
      const entries = Object.entries(data);
      onChange(
        Object.fromEntries([
          ...entries.slice(0, idx),
          ...entries.slice(idx + 1),
        ])
      );
    },
    [onChange, data]
  );

  const handleChangeName = useMemo(
    () =>
      (idx = 0, newName: string) => {
        onChange(
          Object.fromEntries([
            ...dataList.slice(0, idx),
            [newName, dataList[idx][1]],
            ...dataList.slice(idx + 1),
          ])
        );
      },
    [onChange, dataList]
  );

  const row = useCallback(
    (item: [string, T], index?: number) => (
      <MapRow
        onChangeName={(newName) => handleChangeName(index, newName)}
        name={item[0]}
        value={item[1]}
        renderValue={renderValue}
      />
    ),
    [renderValue, handleChangeName]
  );

  return (
    <ListBlock
      getKey={(item) => item[0]}
      bracketsType={bracketsType}
      data={dataList}
      onDelete={handleDelete}
      onAdd={onAdd}
      row={row}
    />
  );
};

export default MapBlock;
