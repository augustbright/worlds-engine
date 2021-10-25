import { Color } from "modules/theming";
import { Space } from "modules/theming/types";
import { fromThemeProp } from "modules/theming/utils";
import React from "react";
import styled from "styled-components";

const Separator = styled.div`
  border-bottom: solid 1px
    ${fromThemeProp((t) => t.colors[Color.DROPDOWN_SEPARATOR])};
  margin: ${fromThemeProp((t) => t.space[Space.SMALL])};
`;

export const SeparatorItem: React.FC = () => <Separator />;
