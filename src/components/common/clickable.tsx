import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React, { useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  cursor: pointer;
  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
    background: ${fromThemeProp(
      (t) => t.colors[Color.BUTTON_HOVER_BACKGROUND]
    )};
  }
  &:focus {
    background: ${fromThemeProp(
      (t) => t.colors[Color.BUTTON_HOVER_BACKGROUND]
    )};
  }
`;

type Props = {
  className?: string;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const Clickable: React.FC<
  Props & React.ComponentProps<typeof Container>
> = ({ onClick, onMouseEnter, onMouseLeave, ...props }) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        onClick();
      }
    },
    [onClick]
  );

  const handleMouseEnter = useCallback(() => {
    onMouseEnter?.call(null);
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave?.call(null);
  }, [onMouseLeave]);

  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <Container
      tabIndex={0}
      role="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );
};
