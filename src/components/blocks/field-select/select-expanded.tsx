import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ListBlock from "../list-block";
import { getNext, getPrevious, Item } from "./common";

type OwnProps = {
  items: Array<Item>;
  value: string;
  onSelect: (value: string) => void;
};

const useItems = (
  items: Array<Item>,
  onSelect: (value: string) => void,
  value: string
) => {
  const [currentValue, setCurrentValue] = useState(items[0].value);
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onSelect(currentValue);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setCurrentValue(getPrevious(items, currentValue).value);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setCurrentValue(getNext(items, currentValue).value);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        onSelect(value);
      }
    },
    [onSelect, currentValue, setCurrentValue, items, value]
  );

  const onClickItem = useCallback(
    (newValue: string) => {
      onSelect(newValue);
    },
    [onSelect]
  );

  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const onBlur = useCallback(() => {
    onSelect(value);
  }, [onSelect, value]);

  return {
    onKeyDown,
    onClickItem,
    currentValue,
    inputRef,
    onBlur,
  };
};

type ItemRowProps = {
  item: Item;
  onClick: (value: string) => void;
  currentValue: string;
};

const ItemRow = ({ item, onClick, currentValue }: ItemRowProps) => {
  const onClickSpan = useCallback(() => {
    onClick(item.value);
  }, [onClick, item]);
  return (
    <span onClick={onClickSpan} role="button">
      {item.value === currentValue ? ">" : ""} {item.title}
    </span>
  );
};

const TypeExpanded: React.FC<OwnProps> = ({ items, onSelect, value }) => {
  const { onKeyDown, onClickItem, currentValue, inputRef, onBlur } = useItems(
    items,
    onSelect,
    value
  );

  return (
    <ListBlock
      mRef={inputRef}
      onBlur={onBlur}
      tabIndex={0}
      onKeyDown={onKeyDown}
      data={items}
      getKey={(item) => item.value}
      row={(item) => (
        <ItemRow
          onClick={onClickItem}
          item={item}
          currentValue={currentValue}
        />
      )}
      bracketsType="SQUARE"
    />
  );
};

export default TypeExpanded;
