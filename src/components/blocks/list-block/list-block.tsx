import React from "react";
import Nested from "components/blocks/nested";
import WithBrackets, { WithBracketsProps } from "../with-brackets";

type OwnProps<T> = {
  data: Array<T>;
  row: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
} & WithBracketsProps;

const SameLine: React.FC = ({ children }) => <>{children}</>;
const NewLine: React.FC = ({ children }) => (
  <div>
    <Nested>{children}</Nested>
  </div>
);

const ListBlock = <T,>({
  row,
  data,
  getKey,
  start,
  end,
}: OwnProps<T>): React.ReactElement => {
  const Wrapper = data.length > 1 ? NewLine : SameLine;
  return (
    <>
      {start}
      {data.map((item) => (
        <Wrapper key={getKey(item)}>{row(item)}</Wrapper>
      ))}
      {end}
    </>
  );
};

export default WithBrackets()(ListBlock);
