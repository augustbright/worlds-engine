import styled from "styled-components";
import { fromThemeProp } from "components/theming/utils";
import { Color } from "components/theming";

export const PatternContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${fromThemeProp((t) => t.colors[Color.LIST_PATH_FOREGROUND])};
  min-width: 16px;
`;
