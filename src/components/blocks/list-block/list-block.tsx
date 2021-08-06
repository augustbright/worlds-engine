import React, { KeyboardEventHandler, useCallback, useMemo } from "react";
import Nested, { Tabs, Tab } from "components/blocks/nested";
import styled from "styled-components";
import AddButton from "components/blocks/add-button";
import WithBrackets, { WithBracketsProps } from "../with-brackets";
import DeleteButton from "../delete-button";

type OwnProps<T> = {
  data: Array<T>;
  row: (item: T, index?: number) => React.ReactNode;
  getKey: (item: T) => string;
  tabIndex?: number;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  onDelete?: (idx: number) => void;
  onAdd?: () => void;
  mRef?: React.Ref<HTMLDivElement> | null;
} & WithBracketsProps;

type WrapperProps = {
  onDelete?: () => void;
};

const Identity: React.FC<WrapperProps> = ({ children, onDelete }) => (
  <>
    {onDelete && <DeleteButton onClick={onDelete} />}
    {children}
  </>
);
const SingleTab: React.FC<WrapperProps> = ({ children, onDelete }) => (
  <>
    <Tab />
    {onDelete && <DeleteButton onClick={onDelete} />}
    {children}{" "}
  </>
);
const NewLine: React.FC<WrapperProps> = ({ children, onDelete }) => (
  <div>
    <Nested>
      <Tabs />
      {onDelete && <DeleteButton onClick={onDelete} />}
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
  &:focus {
    outline: none;
  }
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
  onDelete,
  onAdd,
  mRef,
}: OwnProps<T>): React.ReactElement => {
  const minDataForMultiLines = onAdd ? 0 : 1;
  const ItemWrapper = data.length > minDataForMultiLines ? NewLine : SingleTab;
  const EndWrapper = data.length > minDataForMultiLines ? Tabbed : Identity;

  const handleDelete = useMemo(
    () => (idx: number) => onDelete && onDelete(idx),
    [onDelete]
  );
  const mapper = useCallback(
    (item: T, index: number) => (
      <ItemWrapper
        onDelete={onDelete && (() => handleDelete(index))}
        key={getKey(item)}
      >
        {row(item, index)}
      </ItemWrapper>
    ),
    [onDelete, handleDelete, ItemWrapper, getKey, row]
  );

  return (
    <Block ref={mRef} onBlur={onBlur} tabIndex={tabIndex} onKeyDown={onKeyDown}>
      {start}
      {data.map(mapper)}
      {onAdd ? (
        <ItemWrapper>
          <AddButton onClick={onAdd} />
        </ItemWrapper>
      ) : null}
      <EndWrapper>{end}</EndWrapper>
    </Block>
  );
};

export default WithBrackets()(ListBlock);
