import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import styled from "styled-components";
import { useTabContext } from "../tab-context";

type Props = {
  offset?: number;
};

const Tab = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${fromThemeProp((t) => t.colors[Color.INDENT_FOREGROUND])};
  width: 16px;
`;

export const Indent: React.FC<Props> = ({ offset = 0 }) => {
  const { level } = useTabContext();
  const spaces = [];
  for (let i = 0; i < level + offset; i += 1) {
    spaces.push(<Tab>·</Tab>);
  }

  return <>{spaces}</>;
};
