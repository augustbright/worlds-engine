import { FocusableSpan } from "components/styled";
import React, { KeyboardEvent, useCallback } from "react";

type OwnProps = {
  value: string;
  onClick: () => void;
};

const InputCollapsed: React.FC<OwnProps> = ({ value, onClick }) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        onClick();
      }
    },
    [onClick]
  );
  return (
    <FocusableSpan
      role="button"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      {value || "<EMPTY>"}
    </FocusableSpan>
  );
};

export default InputCollapsed;
