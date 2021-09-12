import React from "react";
import { LayoutBase } from "./base";
import { PageHeader } from "./header";

export const PageLayout: React.FC = ({ children }) => (
  <LayoutBase>
    <PageHeader />
    {children}
  </LayoutBase>
);
