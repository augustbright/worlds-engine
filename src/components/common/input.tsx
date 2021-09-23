import styled from "styled-components";
import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";

export const StyledInput = styled.input`
  padding: 0 4px;
  height: 22px;
  color: ${fromThemeProp((t) => t.colors[Color.INPUT_FOREGROUND])};
  background: ${fromThemeProp((t) => t.colors[Color.INPUT_BACKGROUND])};
  border: solid 1px ${fromThemeProp((t) => t.colors[Color.INPUT_BORDER])};
`;
