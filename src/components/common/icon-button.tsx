import React, { forwardRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { fromThemeProp } from "components/theming/utils";
import { Color } from "components/theming";
import { Space } from "components/theming/types";

const ButtonContainer = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${fromThemeProp((t) => t.colors[Color.LIST_PATH_FOREGROUND])};
  min-width: 22px;
  height: 22px;
  text-decoration: none;

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
  }
  &:active {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_ACTIVE_FOREGROUND])};
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
