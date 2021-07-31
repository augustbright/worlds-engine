import React, { useCallback, useState } from "react";
import { Item } from "./common";
import TypeCollapsed from "./select-collapsed";
import TypeExpanded from "./select-expanded";

type OwnProps = {
  items: Array<Item>;
  value: string;
  onChange: (newType: string) => void;
};

const FieldSelect: React.FC<OwnProps> = ({ items, value, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const onExpand = useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);
  const onSelect = useCallback(
    (newValue: string) => {
      setExpanded(false);
      onChange(newValue);
    },
    [onChange]
  );

  return expanded ? (
    <TypeExpanded items={items} value={value} onSelect={onSelect} />
  ) : (
    <TypeCollapsed items={items} value={value} onExpand={onExpand} />
  );
};

export default FieldSelect;
