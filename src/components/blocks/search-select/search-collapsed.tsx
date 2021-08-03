import React from "react";

type OwnProps<T> = {
  renderTitle: (item: T, onExpand: () => void) => React.ReactElement;
  currentItem: T;
  onExpand: () => void;
};

const SearchCollapsed = <T,>({
  currentItem,
  onExpand,
  renderTitle,
}: OwnProps<T>): React.ReactElement => {
  return renderTitle(currentItem, onExpand);
};

export default SearchCollapsed;
