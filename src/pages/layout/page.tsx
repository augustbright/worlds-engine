import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { LayoutBase } from "./base";
import { PageHeader } from "./header";

const PageContainer = styled.div`
  height: 100vh;
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

export const PageLayout: React.FC = ({ children }) => (
  <LayoutBase>
    <PageContainer>
      <HeaderContainer>
        <PageHeader />
      </HeaderContainer>
      <ContentContainer>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </ContentContainer>
    </PageContainer>
  </LayoutBase>
);
