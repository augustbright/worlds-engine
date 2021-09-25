import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import styled from "styled-components";

export const Reserved = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 22px;
  color: ${fromThemeProp((t) => t.colors[Color.TEXT_RESERVED])};
`;
