import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: ${fromThemeProp((theme) => theme.colors[Color.PRIMARY])};
  color: ${fromThemeProp((theme) => theme.colors[Color.TEXT_PRIMARY])};
`;

export const LayoutBase: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
