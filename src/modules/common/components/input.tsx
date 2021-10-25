import styled from "styled-components";
import { Color } from "modules/theming";
import { fromThemeProp } from "modules/theming/utils";

export const StyledInput = styled.input`
  padding: 0 4px;
  height: 22px;
  color: ${fromThemeProp((t) => t.colors[Color.INPUT_FOREGROUND])};
  background: ${fromThemeProp((t) => t.colors[Color.INPUT_BACKGROUND])};
  border: solid 1px ${fromThemeProp((t) => t.colors[Color.INPUT_BORDER])};
`;
