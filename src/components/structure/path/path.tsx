import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import { range } from "lodash";
import React, { useCallback } from "react";
import styled from "styled-components";
import { PathItem } from "./path-item";

type Props = {
  path: Array<string>;
  onChangePath: (newPath: Array<string>) => void;
};

const Container = styled.div`
  display: flex;
  background: ${fromThemeProp((t) => t.colors[Color.LIST_PATH_BACKGROUND])};
  color: ${fromThemeProp((t) => t.colors[Color.LIST_PATH_FOREGROUND])};
  font-size: 13px;
`;

export const ListPath: React.FC<Props> = ({ path, onChangePath }) => {
  const mapCb = useCallback(
    (i) => {
      const itemPath = path.slice(0, i);
      const handleClick = () => {
        onChangePath(itemPath);
      };
      return <PathItem path={itemPath} onClick={handleClick} />;
    },
    [path, onChangePath]
  );
  return <Container>{range(0, path.length + 1).map(mapCb)}</Container>;
};
