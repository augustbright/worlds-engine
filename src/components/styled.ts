import styled from "styled-components";
import { focusable } from "./theming/mixins";
import { Space } from "./theming/types";
import { fromThemeProp } from "./theming/utils";

export const Input = styled.input`
  border: none;
  font-size: 11pt;
  padding-left: ${fromThemeProp((theme) => theme.space[Space.SMALL])};
  box-sizing: border-box;
  width: ${fromThemeProp((theme) => theme.inputWidth)};
  margin-right: ${fromThemeProp((theme) => theme.space[Space.TINY])};
  margin-left: ${fromThemeProp((theme) => theme.space[Space.TINY])};
  ${focusable}
`;
