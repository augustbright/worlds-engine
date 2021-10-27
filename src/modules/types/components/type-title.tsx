import { Loader } from "modules/abstract/components/loader";
import { StringEditor } from "modules/editor/string-editor";
import React, { useCallback } from "react";
import { Id } from "types/common";
import { useRefDescriptor, useUpdateOwnDescriptor } from "../hook";

type Props = {
  typeId: Id;
};

export const TypeTitle: React.FC<Props> = ({ typeId }) => {
  const descriptorQuery = useRefDescriptor(typeId);
  const updateOwnDescriptor = useUpdateOwnDescriptor();
  const handleChangeTitle = useCallback(
    (name: string) => {
      if (!name) return;
      updateOwnDescriptor.mutate({
        _id: typeId,
        name,
      });
    },
    [typeId, updateOwnDescriptor]
  );
  if (!descriptorQuery.data || descriptorQuery.isLoading) return <Loader />;

  return (
    <StringEditor
      value={descriptorQuery.data.name}
      onChange={handleChangeTitle}
    >
      {descriptorQuery.data.name}
    </StringEditor>
  );
};
