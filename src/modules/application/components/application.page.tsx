import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Color } from "modules/theming";
import { fromThemeProp } from "modules/theming/utils";
import styled from "styled-components";
import { HeaderLayout } from "modules/abstract/components/header.layout";
import { ApplicationRouting } from "./application.routing";
import { ApplicationHeader } from "./application-header";

const PageContainer = styled.div`
  height: 100vh;
  background: ${fromThemeProp((theme) => theme.colors[Color.PRIMARY])};
  color: ${fromThemeProp((theme) => theme.colors[Color.TEXT_PRIMARY])};
`;

export const ApplicationPage: React.FC = () => (
  <PageContainer>
    <HeaderLayout
      header={<ApplicationHeader />}
      content={
        <DndProvider backend={HTML5Backend}>
          <ApplicationRouting />
        </DndProvider>
      }
    />
  </PageContainer>
);
