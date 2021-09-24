import { createTypeDescriptor } from "api/editor";
import { Loader } from "components/common/loader";
import { MapItem } from "components/structure/item/map-item";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { typeDescriptorsSlice } from "state/slices/type-descriptors";
import { Id } from "types/common";
import { AddItem } from "./add-item";
import { ErrorToast } from "./toasts/error";
import { Name } from "./word/name";

export const AddTypeDescriptor: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");

  const handleNewType = useCallback(
    (name: string) => {
      if (!name) return;
      setLoading(name);

      createTypeDescriptor({
        name,
        body: null,
      })
        .then((id: Id) => {
          dispatch(
            typeDescriptorsSlice.actions.addDescriptor({
              descriptor: {
                _id: id,
                name,
                body: null,
              },
            })
          );
        })
        .catch((error: Error) => {
          toast.error(
            <ErrorToast
              message="Failed to create type"
              name={<Name>{name}</Name>}
              details={error.message}
            />
          );
        })
        .finally(() => {
          setLoading("");
        });
    },
    [setLoading, dispatch]
  );

  return loading ? (
    <MapItem
      keyContent={<Name>{loading}</Name>}
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
