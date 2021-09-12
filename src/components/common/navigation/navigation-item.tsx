import { Color } from "components/theming";
import { Space } from "components/theming/types";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { WithRouter } from "types/common";

export type NavigationItem = {
  id: string;
  content: React.ReactNode;
  path: string;
};

type Props = {
  item: NavigationItem;
};

const Li = styled.li``;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: ${fromThemeProp((theme) => theme.colors[Color.NAVIGATION_COLOR])};
  display: flex;
  align-items: center;
  padding: 0 ${fromThemeProp((t) => t.space[Space.MEDIUM])};
  border-right: solid 1px
    ${fromThemeProp((t) => t.colors[Color.NAVIGATION_BORDER])};
  border-bottom: ${(props) => (props.isActive ? "1px" : "0")} solid
    ${fromThemeProp((t) => t.colors[Color.NAVIGATION_ACTIVE_BORDER])};

  &:hover {
    background: ${fromThemeProp((t) => t.colors[Color.NAVIGATION_HOVER])};
  }
`;

const ItemComponent: React.FC<Props & WithRouter> = ({ item, match }) => (
  <StyledLink to={item.path} isActive={match.path === item.path}>
    <Li>{item.content}</Li>
  </StyledLink>
);

export const Item = withRouter(ItemComponent);
