import { focusable } from "components/theming/mixins";
import React, { KeyboardEvent, useCallback } from "react";
import styled from "styled-components";

type OwnProps = {
  value: string;
  onClick: () => void;
};

const Span = styled.span`
  ${focusable}
`;

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
    <Span role="button" tabIndex={0} onKeyDown={onKeyDown} onClick={onClick}>
      {value}
    </Span>
  );
};

export default InputCollapsed;
