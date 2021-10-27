import { Color } from "modules/theming";
import { fromThemeProp } from "modules/theming/utils";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${fromThemeProp((theme) => theme.colors[Color.NAVIGATION_COLOR])};

  &:hover {
    background: ${fromThemeProp((t) => t.colors[Color.NAVIGATION_HOVER])};
  }

  &:focus {
    outline: none;
  }
`;
