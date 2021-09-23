import { Dropdown } from "components/common/dropdown";
import React from "react";
import { PageLayout } from "./layout/page";

export const TestPage: React.FC = () => {
  return (
    <PageLayout>
      <Dropdown
        visible
        content={
          <div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
            <div>line</div>
          </div>
        }
      >
        DROPDOWN
      </Dropdown>
    </PageLayout>
  );
};
