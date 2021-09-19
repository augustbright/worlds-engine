import React, { useCallback } from "react";
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

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.LIST_PATH_HOVER_FOREGROUND])};
  }
`;

type Props = {
  onClick: () => void;
};

export const IconButton: React.FC<
  Omit<React.ComponentProps<typeof FontAwesomeIcon>, "onClick"> & Props
> = ({ className, onClick, ...rest }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <>
      <ButtonContainer className={className} onClick={handleClick}>
        <FontAwesomeIcon {...rest} />
      </ButtonContainer>
    </>
  );
};
