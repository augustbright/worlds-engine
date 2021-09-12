import { NavigationBar } from "components/common/navigation/navigation-bar";
import { NavigationItem } from "components/common/navigation/navigation-item";
import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import styled from "styled-components";

const navigationItems: Array<NavigationItem> = [
  {
    id: "editor",
    content: "Editor",
    path: "/",
  },
  {
    id: "test",
    content: "Test",
    path: "/test",
  },
];

const Header = styled.header`
  background: ${fromThemeProp(
    (theme) => theme.colors[Color.HEADER_BACKGROUND]
  )};
`;

export const PageHeader: React.FC = () => (
  <Header>
    <NavigationBar items={navigationItems} />
  </Header>
);
