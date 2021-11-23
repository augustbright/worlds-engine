import { StyledLink } from "modules/common/components/styled-link";
import { Color } from "modules/theming";
import { Space } from "modules/theming/types";
import { fromThemeProp } from "modules/theming/utils";
import React from "react";
import { LinkProps, matchPath, useLocation } from "react-router-dom";
import styled from "styled-components";

type LinkExtraProps = {
  isMatch: boolean;
};

const Container = styled(
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  ({ isMatch, ...props }: LinkExtraProps & LinkProps) => (
    <StyledLink {...props} />
  )
)<LinkExtraProps>`
  display: block;
  padding: ${fromThemeProp((t) => t.space[Space.MEDIUM])};

  cursor: pointer;
  background: ${(props) =>
    props.isMatch ? props.theme.colors[Color.BUTTON_HOVER_BACKGROUND] : "none"};

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
    background: ${fromThemeProp(
      (t) => t.colors[Color.BUTTON_HOVER_BACKGROUND]
    )};
  }
`;

type Props = {
  to: string;
};

export const AssetLink: React.FC<Props> = ({ children, to }) => {
  const location = useLocation();
  const match = matchPath(location.pathname, {
    path: to,
  });
  const isMatch = !!match;

  return (
    <Container isMatch={isMatch} to={to}>
      {children}
    </Container>
  );
};
