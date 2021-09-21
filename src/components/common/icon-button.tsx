import React, { forwardRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { fromThemeProp } from "components/theming/utils";
import { Color } from "components/theming";

const ButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${fromThemeProp((t) => t.colors[Color.LIST_PATH_FOREGROUND])};
  width: 22px;
  height: 22px;

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
  }
  &:active {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_ACTIVE_FOREGROUND])};
  }
`;

type Props = {
  onClick: () => void;
};

export const IconButton = forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<typeof FontAwesomeIcon>, "onClick"> & Props
>(({ className, onClick, ...rest }, ref) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <>
      <ButtonContainer ref={ref} className={className} onClick={handleClick}>
        <FontAwesomeIcon {...rest} />
      </ButtonContainer>
    </>
  );
});
