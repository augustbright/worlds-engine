import React from "react";
import Nested from "components/blocks/nested";

type OwnProps<T> = {
  data: Array<T>;
  row: (item: T) => JSX.Element;
  getKey: (item: T) => string;
};

const SameLine: React.FC = ({ children }) => <>{children}</>;
const NewLine: React.FC = ({ children }) => (
  <div>
    <Nested>{children}</Nested>
  </div>
);

const ListBlock = <T,>({ row, data, getKey }: OwnProps<T>): JSX.Element => {
  const Wrapper = data.length > 1 ? NewLine : SameLine;
  return (
    <>
      {data.map((item) => (
        <Wrapper key={getKey(item)}>{row(item)}</Wrapper>
      ))}
    </>
  );
};

export default ListBlock;
