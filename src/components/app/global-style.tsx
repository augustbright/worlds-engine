import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*:focus {
    outline: 1px dotted black;
}

html {
}

body {
    font-family: 'Roboto';
    font-weight: 400;
    background: ${fromThemeProp((t) => t.colors[Color.PAGE_BACKGROUND])}
}
`;
