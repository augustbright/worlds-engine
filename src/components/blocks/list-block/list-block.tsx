import React from "react";
import Nested, { Tabs } from "components/blocks/nested";
import WithBrackets, { WithBracketsProps } from "../with-brackets";

type OwnProps<T> = {
  data: Array<T>;
  row: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
} & WithBracketsProps;

const Identity: React.FC = ({ children }) => <>{children}</>;
const NewLine: React.FC = ({ children }) => (
  <div>
    <Nested>
      <Tabs />
      {children}
    </Nested>
  </div>
);
const Tabbed: React.FC = ({ children }) => (
  <>
    <Tabs />
    {children}
  </>
);

const ListBlock = <T,>({
  row,
  data,
  getKey,
  start,
  end,
}: OwnProps<T>): React.ReactElement => {
  const ItemWrapper = data.length > 1 ? NewLine : Identity;
  const EndWrapper = data.length > 1 ? Tabbed : Identity;
  return (
    <>
      {start}
      {data.map((item) => (
        <ItemWrapper key={getKey(item)}>{row(item)}</ItemWrapper>
      ))}
      <EndWrapper>{end}</EndWrapper>
    </>
  );
};

export default WithBrackets()(ListBlock);
