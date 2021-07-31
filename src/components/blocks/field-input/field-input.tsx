import React, { useCallback, useState } from "react";
import InputCollapsed from "./input-collapsed";
import InputExpanded from "./input-expanded";

type OwnProps = {
  value: string;
  onChange: (newValue: string) => void;
};

const FieldInput: React.FC<OwnProps> = ({ value, onChange }) => {
  const [expanded, setExpanded] = useState(false);
  const onCollapsedClick = useCallback(() => {
    setExpanded(true);
  }, [setExpanded]);
  const onChangeExpandedInput = useCallback(
    (newValue: string) => {
      setExpanded(false);
      onChange(newValue);
    },
    [setExpanded, onChange]
  );

  return expanded ? (
    <InputExpanded value={value} onChange={onChangeExpandedInput} />
  ) : (
    <InputCollapsed value={value} onClick={onCollapsedClick} />
  );
};

export default FieldInput;
