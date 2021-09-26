import { Loader } from "components/common/loader";
import { MapItem } from "components/structure/item/map-item";
import { useUpdateOwnDescriptor } from "hook/type-descriptors";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { Id } from "types/common";
import { AddItem } from "./add-item";
import { ErrorToast } from "./toasts/error";
import { Name } from "./word/name";

export const AddTypeDescriptor: React.FC = () => {
  const updateOwnDescriptor = useUpdateOwnDescriptor();
  const [newName, setNewName] = useState("");

  const handleNewType = useCallback(
    (name: string) => {
      if (!name) return;
      setNewName(name);
      updateOwnDescriptor.mutate({
        name,
        body: null,
      });
    },
    [setNewName, updateOwnDescriptor]
  );

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
