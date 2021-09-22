import { DescriptorEditor } from "components/editor/descriptor-editor";
import { AnchorViewer } from "components/structure/anchor/viewer";
import React from "react";
import { PageLayout } from "./layout/page";

export const MainPage: React.FC = () => {
  return (
    <PageLayout>
      <AnchorViewer>
        <DescriptorEditor />
      </AnchorViewer>
    </PageLayout>
  );
};
