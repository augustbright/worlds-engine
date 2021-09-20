import { DescriptorEditor } from "components/descriptor-editor";
import React from "react";
import { PageLayout } from "./layout/page";

export const MainPage: React.FC = () => {
  return (
    <PageLayout>
      <DescriptorEditor />
    </PageLayout>
  );
};
