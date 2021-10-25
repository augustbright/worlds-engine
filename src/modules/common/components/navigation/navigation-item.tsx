import { Color } from "modules/theming";
import { Space } from "modules/theming/types";
import { fromThemeProp } from "modules/theming/utils";
import React from "react";
import { Link, LinkProps, withRouter } from "react-router-dom";
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

type LinkExtraProps = {
  isActive: boolean;
};

const StyledLink = styled(
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  ({ isActive, ...props }: LinkExtraProps & LinkProps) => <Link {...props} />
)<LinkExtraProps>`
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
