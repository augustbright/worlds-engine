import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SidebarContainer = styled.div`
  flex: 0 0 auto;
`;

const ContentContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;

type Props = {
  sidebar: React.ReactNode;
  content: React.ReactNode;
};

export const SidebarLayout: React.FC<Props> = ({ content, sidebar }) => (
  <LayoutContainer>
    <SidebarContainer>{sidebar}</SidebarContainer>
    <ContentContainer>{content}</ContentContainer>
  </LayoutContainer>
);
