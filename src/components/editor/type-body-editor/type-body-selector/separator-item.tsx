import { Color } from "components/theming";
import { Space } from "components/theming/types";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import styled from "styled-components";

const Separator = styled.div`
  border-bottom: solid 1px
    ${fromThemeProp((t) => t.colors[Color.DROPDOWN_SEPARATOR])};
  margin: ${fromThemeProp((t) => t.space[Space.SMALL])};
`;

export const SeparatorItem: React.FC = () => <Separator />;
