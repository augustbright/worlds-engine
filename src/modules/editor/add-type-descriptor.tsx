import { MapItem } from "modules/structure/item/map-item";
import { useOwnDescriptors, useUpdateOwnDescriptor } from "modules/types/hook";
import React, { useCallback, useState } from "react";
import { Loader } from "modules/abstract/components/loader";
import { Id } from "types/common";
import { AddItem } from "../common/components/add-item";
import { Name } from "./word/name";

type Props = {
  packageId?: Id;
};

export const AddTypeDescriptor: React.FC<Props> = ({ packageId }) => {
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
        packageId,
        body: null,
        order: (ownDescriptors[ownDescriptors.length - 1]?.order || 0) + 1,
      });
    },
    [setNewName, updateOwnDescriptor, ownDescriptorsQuery, packageId]
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
