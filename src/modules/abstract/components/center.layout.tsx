import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterLayout: React.FC = ({ children }) => (
  <LayoutContainer>{children}</LayoutContainer>
);
