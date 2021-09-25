import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import styled from "styled-components";
import { useTabContext } from "../tab-context";

const Tab = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${fromThemeProp((t) => t.colors[Color.INDENT_FOREGROUND])};
  width: 22px;
  height: 22px;
  font-size: 8px;
`;

export const Indent: React.FC = () => {
  const { level } = useTabContext();
  const spaces = [];
  for (let i = 0; i < level; i += 1) {
    spaces.push(
      <>
        <Tab>·</Tab>
        <Tab>·</Tab>
      </>
    );
  }

  return <>{spaces}</>;
};
