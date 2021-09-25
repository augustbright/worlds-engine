import React from "react";
import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 22px;
`;

const ValueSet = styled(Container)<{
  nameColor: Color;
}>`
  color: ${(props) => fromThemeProp((t) => t.colors[props.nameColor])(props)};
  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.TEXT_NAME_HOVER])};
  }
`;

const ValueUnset = styled(Container)`
  color: ${fromThemeProp((t) => t.colors[Color.TEXT_NAME_UNSET])};

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.TEXT_NAME_HOVER])};
  }
`;

type Props = {
  color?: Color;
};

export const Name: React.FC<Props> = ({
  children,
  color = Color.TEXT_NAME,
}) => {
  if (children) {
    return <ValueSet nameColor={color}>{children}</ValueSet>;
  }
  return (
    <ValueUnset>
      {"<"}deleting{">"}
    </ValueUnset>
  );
};
