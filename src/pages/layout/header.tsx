import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { unsetToken } from "api/utils";
import { IconButton } from "components/common/icon-button";
import { Loader } from "components/common/loader";
import { NavigationBar } from "components/common/navigation/navigation-bar";
import { NavigationItem } from "components/common/navigation/navigation-item";
import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React, { useCallback } from "react";
import { useIsFetching, useQueryClient } from "react-query";
import styled from "styled-components";

const navigationItems: Array<NavigationItem> = [
  {
    id: "packages",
    content: "Packages",
    path: "/packages",
  },
  {
    id: "editor",
    content: "Editor",
    path: "/",
  },
  {
    id: "profile",
    content: "Profile",
    path: "/profile",
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

const NavigationContainer = styled.div`
  flex: 1 1 auto;
`;

const Logo = styled.div`
  display: inline;
`;

export const PageHeader: React.FC = () => {
  const isFetching = useIsFetching();
  const queryClient = useQueryClient();
  const handleClickLogout = useCallback(() => {
    unsetToken();
    queryClient.invalidateQueries();
  }, [queryClient]);

  return (
    <Header>
      <LogoContainer>{isFetching ? <Loader /> : <Logo>W</Logo>}</LogoContainer>
      <NavigationContainer>
        <NavigationBar items={navigationItems} />
      </NavigationContainer>
      <IconButton onClick={handleClickLogout} icon={faDoorOpen} />
    </Header>
  );
};
