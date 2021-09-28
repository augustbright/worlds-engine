import { Loader } from "components/common/loader";
import { MapItem } from "components/structure/item/map-item";
import {
  useOwnDescriptors,
  useUpdateOwnDescriptor,
} from "hook/type-descriptors";
import React, { useCallback, useState } from "react";
import { AddItem } from "./add-item";
import { Name } from "./word/name";

export const AddTypeDescriptor: React.FC = () => {
  const updateOwnDescriptor = useUpdateOwnDescriptor();
  const ownDescriptorsQuery = useOwnDescriptors();
  const [newName, setNewName] = useState("");

  const handleNewType = useCallback(
    (name: string) => {
      const ownDescriptors = ownDescriptorsQuery.data || [];
      if (!name) return;
      setNewName(name);
      updateOwnDescriptor.mutate({
        name,
        body: null,
        order: (ownDescriptors[ownDescriptors.length - 1]?.order || 0) + 1,
      });
    },
    [setNewName, updateOwnDescriptor, ownDescriptorsQuery]
  );

  if (ownDescriptorsQuery.isLoading) return null;

  return updateOwnDescriptor.isLoading ? (
    <MapItem
      keyContent={<Name>{newName}</Name>}
      valueContent={
        <>
          {" "}
          <Loader />
        </>
      }
    />
  ) : (
    <AddItem onNewItem={handleNewType}>Type</AddItem>
  );
};
