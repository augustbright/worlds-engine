import { css, ThemeProps } from "styled-components";
import { Color, Theme } from "./types";

export const focusable = css`
  &:focus {
    outline: 1px dotted
      ${(props: ThemeProps<Theme>) => props.theme.colors[Color.FOCUS]};
  }
`;
