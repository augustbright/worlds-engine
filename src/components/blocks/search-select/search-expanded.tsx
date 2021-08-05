import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import {
  ValueGetter,
  FetchItems,
  getItem,
  getNext,
  getPrevious,
} from "./common";
import ListBlock from "../list-block";
import LoadingIndicator from "../loading-indicator";

type OwnProps<T> = {
  fetch: FetchItems<T>;
  valueGetter: ValueGetter<T>;
  currentItem: T;
  nameGetter: (item: T) => string;
  renderRow: (
    item: T,
    focused: boolean,
    onSelect: () => void
  ) => React.ReactElement;
  onSelect: (item: T | undefined) => void;
};

const SearchExpanded = <T,>({
  fetch,
  onSelect,
  renderRow,
  valueGetter,
  nameGetter,
  currentItem,
}: OwnProps<T>): React.ReactElement => {
  const [text, setText] = useState(nameGetter(currentItem));
  const [items, setItems] = useState<Array<T>>([]);
  const [focusedValue, setFocusedValue] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const loadItems = useMemo(
    () => async () => {
      setLoading(true);
      const newItems = await fetch(text);
      setItems(newItems);
      setFocusedValue(valueGetter(newItems[0]));
      setLoading(false);
    },
    [setLoading, fetch, text, setItems, setFocusedValue, valueGetter]
  );
  const requestItems = useMemo(() => debounce(loadItems, 500), [loadItems]);
  useEffect(() => {
    loadItems();
  }, [loadItems]);
  useEffect(() => {
    requestItems();
  }, [text, requestItems]);
  const focusedItem = useMemo(() => {
    return focusedValue ? getItem(items, valueGetter, focusedValue) : undefined;
  }, [items, valueGetter, focusedValue]);
  const onChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    [setText]
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onSelect(focusedItem);
      }

      if (event.key === "ArrowUp" && focusedValue) {
        event.preventDefault();
        const previousItem = getPrevious(items, valueGetter, focusedValue);
        setFocusedValue(valueGetter(previousItem));
      }

      if (event.key === "ArrowDown" && focusedValue) {
        event.preventDefault();
        const nextItem = getNext(items, valueGetter, focusedValue);
        setFocusedValue(valueGetter(nextItem));
      }
    },
    [onSelect, focusedItem, focusedValue, items, valueGetter]
  );
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
  const onFocus = useCallback(() => {
    inputRef?.current?.select();
  }, [inputRef]);
  const onBlur = useCallback(() => {
    onSelect(currentItem);
  }, [onSelect, currentItem]);
  const row = useCallback(
    (item: T) => {
      return renderRow(item, valueGetter(item) === focusedValue, () => {
        onSelect(item);
      });
    },
    [renderRow, valueGetter, focusedValue, onSelect]
  );

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {loading && !items.length ? (
        <LoadingIndicator />
      ) : (
        <>
          {" "}
          <ListBlock
            bracketsType="SQUARE"
            data={items}
            getKey={valueGetter}
            row={row}
          />
        </>
      )}
    </>
  );
};

export default SearchExpanded;
