import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const SideContainer = styled.div`
  display: flex;
  flex: 0 0 50%;
  justify-content: center;
  align-items: center;
`;

type Props = {
  main: React.ReactNode;
  secondary: React.ReactNode;
};

export const DoubleLayout: React.FC<Props> = ({ main, secondary }) => (
  <LayoutContainer>
    <SideContainer>{main}</SideContainer>
    <SideContainer>{secondary}</SideContainer>
  </LayoutContainer>
);
