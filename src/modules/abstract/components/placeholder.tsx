import { Color } from "modules/theming";
import { Space } from "modules/theming/types";
import { fromThemeProp } from "modules/theming/utils";
import React from "react";
import styled from "styled-components";
import { CenterLayout } from "./center.layout";

const Container = styled.div`
  outline: 1px dashed
    ${fromThemeProp((t) => t.colors[Color.PLACEHOLDER_OUTLINE])};
  color: ${fromThemeProp((t) => t.colors[Color.PLACEHOLDER_TEXT])};
  padding: ${fromThemeProp((t) => t.space[Space.MEDIUM])};
`;

export const Placeholder: React.FC = ({ children }) => (
  <Container>
    <CenterLayout>{children}</CenterLayout>
  </Container>
);
