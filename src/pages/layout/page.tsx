import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutBase } from "./base";
import { PageHeader } from "./header";

export const PageLayout: React.FC = ({ children }) => (
  <LayoutBase>
    <PageHeader />
    <DndProvider backend={HTML5Backend}>{children}</DndProvider>
  </LayoutBase>
);
