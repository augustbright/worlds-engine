import { Loader } from "modules/abstract/components/loader";
import { StringEditor } from "modules/editor/string-editor";
import React, { useCallback } from "react";
import { Id } from "types/common";
import { useRefPackage, useUpdateOwnPackage } from "../hook";

type Props = {
  packageId: Id;
};

export const PackageTitle: React.FC<Props> = ({ packageId }) => {
  const packageQuery = useRefPackage(packageId);
  const updatePackage = useUpdateOwnPackage();
  const handleChangeTitle = useCallback(
    (name: string) => {
      if (!name) return;
      updatePackage.mutate({
        _id: packageId,
        name,
      });
    },
    [updatePackage, packageId]
  );
  if (!packageQuery.data || packageQuery.isLoading) return <Loader />;

  return (
    <StringEditor value={packageQuery.data.name} onChange={handleChangeTitle}>
      {packageQuery.data.name}
    </StringEditor>
  );
};
