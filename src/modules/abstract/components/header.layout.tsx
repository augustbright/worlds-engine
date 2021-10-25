import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  flex: 0 0 auto;
`;

const ContentContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;

type Props = {
  header: React.ReactNode;
  content: React.ReactNode;
};

export const HeaderLayout: React.FC<Props> = ({ content, header }) => (
  <LayoutContainer>
    <HeaderContainer>{header}</HeaderContainer>
    <ContentContainer>{content}</ContentContainer>
  </LayoutContainer>
);
