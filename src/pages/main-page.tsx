import { DescriptorEditor } from "components/editor/descriptor-editor";
import { getDescriptorRefs } from "func/types";
import { useOwnDescriptors, useRefDescriptors } from "hook/type-descriptors";
import React, { useMemo } from "react";
import { PageLayout } from "./layout/page";
import { LoadingPage } from "./loading-page";

export const MainPage: React.FC = () => {
  const ownDescriptorsQuery = useOwnDescriptors();
  const refs = (ownDescriptorsQuery.data || []).map(getDescriptorRefs).flat();
  const descriptorsQuery = useRefDescriptors(refs);
  const pageContent = useMemo(() => {
    if (ownDescriptorsQuery.isLoading) return <LoadingPage>Types</LoadingPage>;
    if (descriptorsQuery.every(({ isLoading }) => isLoading))
      return <LoadingPage>Type descriptors</LoadingPage>;

    return <DescriptorEditor />;
  }, [descriptorsQuery, ownDescriptorsQuery]);

  return <PageLayout>{pageContent}</PageLayout>;
};
