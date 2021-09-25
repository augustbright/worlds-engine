import React, { forwardRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { fromThemeProp } from "components/theming/utils";
import { Color } from "components/theming";
import { Space } from "components/theming/types";

const ButtonContainer = styled.a`
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${fromThemeProp((t) => t.colors[Color.LIST_PATH_FOREGROUND])};
  min-width: 22px;
  height: 22px;
  text-decoration: none;

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
    background: ${fromThemeProp(
      (t) => t.colors[Color.BUTTON_HOVER_BACKGROUND]
    )};
  }
  &:active {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_ACTIVE_FOREGROUND])};
  }
  &:focus {
    outline: none;
    background: ${fromThemeProp(
      (t) => t.colors[Color.BUTTON_HOVER_BACKGROUND]
    )};
  }
`;

const TextContainer = styled.span`
  margin-left: ${fromThemeProp((t) => t.space[Space.MEDIUM])};
`;

type Props = {
  onClick?: () => void;
};

export const IconButton = forwardRef<
  HTMLAnchorElement,
  Omit<React.ComponentProps<typeof FontAwesomeIcon>, "onClick"> &
    React.PropsWithChildren<Props>
>(({ className, onClick, children, href, ...rest }, ref) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        event.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <>
      <ButtonContainer
        role="button"
        tabIndex={0}
        href={href}
        ref={ref}
        className={className}
        onClick={handleClick}
      >
        <FontAwesomeIcon {...rest} />
        {children ? <TextContainer>{children}</TextContainer> : null}
      </ButtonContainer>
    </>
  );
});
