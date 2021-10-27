import { SidebarLayout } from "modules/abstract/components/sidebar.layout";
import { ApplicationPage } from "modules/application/components/application-page";
import React from "react";
import { AssetsContent } from "./assets.content";
import { AssetsSidebar } from "./assets.sidebar";

export const AssetsPage: React.FC = () => {
  return (
    <ApplicationPage>
      <SidebarLayout sidebar={<AssetsSidebar />} content={<AssetsContent />} />
    </ApplicationPage>
  );
};
