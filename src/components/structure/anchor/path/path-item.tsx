import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Color } from "components/theming";
import { Space } from "components/theming/types";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import styled from "styled-components";

type Props = {
  path: Array<string>;
  onClick: () => void;
};

const Item = styled.div`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding-right: ${fromThemeProp((t) => t.space[Space.SMALL])};
  cursor: pointer;

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.LIST_PATH_HOVER_FOREGROUND])};
  }
`;

export const PathItem: React.FC<Props> = ({ path, onClick }) => {
  if (path.length === 0) {
    return (
      <Item onClick={onClick}>
        <FontAwesomeIcon size="sm" icon={faHome} />
      </Item>
    );
  }

  return (
    <Item onClick={onClick}>
      {"> "}
      {path[path.length - 1]}
    </Item>
  );
};
