import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { fromThemeProp } from "components/theming/utils";
import { Color } from "components/theming";
import { StringEditor } from "../editor/string-editor";

type Props = {
  onNewItem: (name: string) => void;
};

const Button = styled.div`
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
  font-family: "FiraCode";

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

export const AddItem: React.FC<Props> = ({ children = "item", onNewItem }) => {
  const handleChange = useCallback(
    (value: string) => {
      onNewItem(value.trim());
    },
    [onNewItem]
  );

  return (
    <StringEditor value="" onChange={handleChange}>
      <Button>
        <IconContainer>
          <FontAwesomeIcon size="sm" icon={faPlus} />
        </IconContainer>
        {children}
      </Button>
    </StringEditor>
  );
};
