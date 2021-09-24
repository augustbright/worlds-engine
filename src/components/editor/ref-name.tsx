import { Loader } from "components/common/loader";
import { useRefDescriptor } from "hook/type-descriptors";
import React from "react";
import { NotFoundDescriptor } from "types/descriptors";
import { TypeRefId } from "types/ref";

type Props = {
  refId: TypeRefId;
};

export const RefName: React.FC<Props> = ({ refId }) => {
  const isNotFound = (descriptor: any): descriptor is NotFoundDescriptor =>
    !!descriptor.error;
  const descriptor = useRefDescriptor(refId);
  if (!descriptor) return <Loader />;

  if (isNotFound(descriptor)) {
    return <>TYPE NOT FOUND</>;
  }

  return <>{descriptor.name}</>;
};
