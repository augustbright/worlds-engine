import { useRefDescriptor } from "modules/types/hook";
import { Loader } from "modules/abstract/components/loader";
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
