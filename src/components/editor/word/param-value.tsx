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

const ValueSet = styled(Container)`
  color: ${fromThemeProp((t) => t.colors[Color.TEXT_PARAM])};
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.TEXT_PARAM_HOVER])};
  }
`;

const ValueUnset = styled(Container)`
  color: ${fromThemeProp((t) => t.colors[Color.TEXT_PARAM_UNSET])};

  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.TEXT_PARAM_HOVER])};
  }
`;

export const ParamValue: React.FC = ({ children }) => {
  if (children) {
    return <ValueSet>{children}</ValueSet>;
  }
  return <ValueUnset>unset</ValueUnset>;
};
