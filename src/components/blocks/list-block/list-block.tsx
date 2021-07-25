import React from "react";
import Nested from "components/blocks/nested";

type OwnProps<T> = {
  data: Array<T>;
  row: (item: T) => JSX.Element;
  getKey: (item: T) => string;
};

const ListBlock = <T,>({ row, data, getKey }: OwnProps<T>): JSX.Element => (
  <>
    {data.map((item) => (
      <Nested key={getKey(item)}>{row(item)}</Nested>
    ))}
  </>
);

export default ListBlock;
