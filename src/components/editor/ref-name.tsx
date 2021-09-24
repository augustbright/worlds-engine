import { Loader } from "components/common/loader";
import { isNotFound } from "func/types";
import { useRefDescriptor } from "hook/type-descriptors";
import React from "react";
import { TypeRefId } from "types/ref";

type Props = {
  refId: TypeRefId;
};

export const RefName: React.FC<Props> = ({ refId }) => {
  const descriptor = useRefDescriptor(refId);
  if (!descriptor) return <Loader />;

  if (isNotFound(descriptor)) {
    return <>TYPE NOT FOUND</>;
  }

  return <>{descriptor.name}</>;
};
