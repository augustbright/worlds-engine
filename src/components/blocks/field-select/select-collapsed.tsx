import { FocusableSpan } from "components/styled";
import React, { KeyboardEvent, useCallback } from "react";
import { Item, getTitle } from "./common";

type OwnProps = {
  value: string;
  onExpand: () => void;
  items: Array<Item>;
};

const TypeCollapsed: React.FC<OwnProps> = ({ value, onExpand, items }) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        onExpand();
      }
    },
    [onExpand]
  );
  return (
    <FocusableSpan
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={onExpand}
    >
      {getTitle(items, value) || "<EMPTY>"}
    </FocusableSpan>
  );
};

export default TypeCollapsed;
