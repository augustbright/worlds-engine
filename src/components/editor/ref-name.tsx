import { Loader } from "components/common/loader";
import { useRefDescriptor } from "hook/type-descriptors";
import React from "react";
import { TypeRefId } from "types/ref";

type Props = {
  refId: TypeRefId;
};

export const RefName: React.FC<Props> = ({ refId }) => {
  const descriptorQuery = useRefDescriptor(refId);
  if (descriptorQuery.isLoading) return <Loader />;

  if (!descriptorQuery.data) {
    return <>TYPE NOT FOUND</>;
  }

  return <>{descriptorQuery.data.name}</>;
};
