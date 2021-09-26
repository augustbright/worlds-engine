import { Loader } from "components/common/loader";
import { NavigationBar } from "components/common/navigation/navigation-bar";
import { NavigationItem } from "components/common/navigation/navigation-item";
import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import { useIsFetching } from "react-query";
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
  display: flex;
  background: ${fromThemeProp(
    (theme) => theme.colors[Color.HEADER_BACKGROUND]
  )};
`;

const LogoContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

const Logo = styled.div`
  display: inline;
`;

export const PageHeader: React.FC = () => {
  const isFetching = useIsFetching();
  return (
    <Header>
      <LogoContainer>{isFetching ? <Loader /> : <Logo>W</Logo>}</LogoContainer>
      <NavigationBar items={navigationItems} />
    </Header>
  );
};
