import React, { KeyboardEventHandler } from "react";
import Nested, { Tabs } from "components/blocks/nested";
import styled from "styled-components";
import WithBrackets, { WithBracketsProps } from "../with-brackets";

type OwnProps<T> = {
  data: Array<T>;
  row: (item: T, index?: number) => React.ReactNode;
  getKey: (item: T) => string;
  tabIndex?: number;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  mRef?: React.Ref<HTMLDivElement> | null;
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
const Block = styled.div`
  display: inline;
`;

const ListBlock = <T,>({
  row,
  data,
  getKey,
  start,
  end,
  tabIndex,
  onKeyDown,
  onBlur,
  mRef,
}: OwnProps<T>): React.ReactElement => {
  const ItemWrapper = data.length > 1 ? NewLine : Identity;
  const EndWrapper = data.length > 1 ? Tabbed : Identity;

  return (
    <Block ref={mRef} onBlur={onBlur} tabIndex={tabIndex} onKeyDown={onKeyDown}>
      {start}
      {data.map((item, index) => (
        <ItemWrapper key={getKey(item)}>{row(item, index)}</ItemWrapper>
      ))}
      <EndWrapper>{end}</EndWrapper>
    </Block>
  );
};

export default WithBrackets()(ListBlock);
