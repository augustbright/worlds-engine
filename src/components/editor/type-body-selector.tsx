import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Reserved } from "./reserved";

const Selector = styled(Reserved)`
  cursor: pointer;
  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
  }
`;

export const TypeBodySelector: React.FC = ({ children }) => {
  const [active, setActive] = useState(false);
  const handleClickSelector = useCallback(() => {
    setActive(true);
  }, [setActive]);
  return active ? (
    <span>***input***</span>
  ) : (
    <Selector onClick={handleClickSelector}>{children}</Selector>
  );
};
