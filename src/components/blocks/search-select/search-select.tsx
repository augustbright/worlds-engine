import React, { useCallback, useState } from "react";
import { ValueGetter, FetchItems } from "./common";
import SearchCollapsed from "./search-collapsed";
import SearchExpanded from "./search-expanded";

type OwnProps<T> = {
  fetch: FetchItems<T>;
  valueGetter: ValueGetter<T>;
  nameGetter: (item: T) => string;
  renderTitle: (item: T, onExpand: () => void) => React.ReactElement;
  renderRow: (
    item: T,
    focused: boolean,
    onSelect: () => void
  ) => React.ReactElement;
  currentItem: T;
  onChange: (newItem: T) => void;
};

const SearchSelect = <T,>({
  currentItem,
  fetch,
  valueGetter,
  nameGetter,
  renderTitle,
  renderRow,
  onChange,
}: OwnProps<T>): React.ReactElement => {
  const [expanded, setExpanded] = useState(false);
  const onExpand = useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);
  const onSelect = useCallback(
    (newItem?: T) => {
      setExpanded(false);
      if (newItem) {
        onChange(newItem);
      }
    },
    [onChange]
  );

  return expanded ? (
    <SearchExpanded
      fetch={fetch}
      valueGetter={valueGetter}
      renderRow={renderRow}
      onSelect={onSelect}
      currentItem={currentItem}
      nameGetter={nameGetter}
    />
  ) : (
    <SearchCollapsed
      currentItem={currentItem}
      renderTitle={renderTitle}
      onExpand={onExpand}
    />
  );
};

export default SearchSelect;
