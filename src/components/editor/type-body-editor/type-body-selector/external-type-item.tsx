import { Color, Space } from "components/theming/types";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import styled from "styled-components";

type Props = {
  name: string;
  author: string;
};

const ItemContainer = styled.div`
  padding: ${fromThemeProp((t) => t.space[Space.SMALL])};
  color: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_FOREGROUND])};
  cursor: pointer;

  &:hover {
    background: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_HOVER])};
    color: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_HOVER_FOREGROUND])};
  }
`;

const NameContainer = styled.div`
  white-space: nowrap;
`;

const AuthorContainer = styled.div`
  white-space: nowrap;
  color: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_AUTHOR])};
`;

export const ExternalTypeItem: React.FC<Props> = ({ name, author }) => (
  <ItemContainer>
    <NameContainer>{name}</NameContainer>
    <AuthorContainer>{author}</AuthorContainer>
  </ItemContainer>
);
