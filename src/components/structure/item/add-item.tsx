import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { fromThemeProp } from "components/theming/utils";
import { Color } from "components/theming";

type Props = {
  onClick: () => void;
};

const Button = styled.button`
  display: inline-flex;
  height: 22px;
  align-items: center;
  justify-content: center;
  background-color: ${fromThemeProp((t) => t.colors[Color.BUTTON_BACKGROUND])};
  color: ${fromThemeProp((t) => t.colors[Color.BUTTON_FOREGROUND])};
  border: solid 1px ${fromThemeProp((t) => t.colors[Color.BUTTON_BORDER])};
  padding: 0 8px 0 0;
  cursor: pointer;
  font-size: 13px;
  font-family: "Roboto";

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
  }
`;

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
`;

export const AddItem: React.FC<Props> = ({ children = "item", onClick }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return (
    <Button onClick={handleClick}>
      <IconContainer>
        <FontAwesomeIcon size="sm" icon={faPlus} />
      </IconContainer>
      {children}
    </Button>
  );
};
