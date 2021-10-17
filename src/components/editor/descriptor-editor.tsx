import { List } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/with-brackets";
import {
  useDeleteOwnDescriptor,
  useOwnDescriptors,
  useRearrangeOwnDescriptors,
  useUpdateOwnDescriptor,
} from "hook/type-descriptors";
import React, { useCallback, useMemo } from "react";
import { TypeBody, TypeDescriptor } from "types/descriptors";
import { Color } from "components/theming";
import { Loader } from "components/common/loader";
import { Rearranger } from "components/common/rearranger";
import { rearrangeDescriptors } from "func/types";
import { MapItem } from "../structure/item/map-item";
import { StringEditor } from "./string-editor";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";
import { ViewParams } from "./view-params";
import { Name } from "./word/name";
import { AddTypeDescriptor } from "./add-type-descriptor";

type TypeItemProps = {
  descriptor: TypeDescriptor;
};

const TypeItem: React.FC<TypeItemProps> = React.memo(({ descriptor }) => {
  const updateOwnDescriptor = useUpdateOwnDescriptor();
  const deleteOwnDescriptor = useDeleteOwnDescriptor();

  const handleChangeName = useCallback(
    (newName: string) => {
      if (!newName) {
        deleteOwnDescriptor.mutate(descriptor._id);
        return;
      }
      updateOwnDescriptor.mutate({
        ...descriptor,
        name: newName,
      });
    },
    [descriptor, updateOwnDescriptor, deleteOwnDescriptor]
  );

  const handleChangeBody = useCallback(
    (newBody: TypeBody) => {
      updateOwnDescriptor.mutate({
        ...descriptor,
        body: newBody,
      });
    },
    [updateOwnDescriptor, descriptor]
  );

  return (
    <MapItem
      keyContent={
        <>
          <StringEditor value={descriptor.name} onChange={handleChangeName}>
            <Name color={Color.TEXT_TYPE_NAME}>{descriptor.name}</Name>
          </StringEditor>
          <ViewParams descriptor={descriptor} />
        </>
      }
      valueContent={
        <TypeBodyEditor body={descriptor.body} onChange={handleChangeBody} />
      }
    />
  );
});

const useItems = () => {
  const ownDescriptorsQuery = useOwnDescriptors();
  const rearrangeOwnDescriptors = useRearrangeOwnDescriptors();

  const items = useMemo(() => {
    const descriptors = ownDescriptorsQuery.data || [];

    const handleRearrange = (from: string, to: string) => {
      rearrangeOwnDescriptors.mutate(
        rearrangeDescriptors(descriptors, from, to)
      );
    };

    const mapItems = Object.values(descriptors).map((descriptor) => ({
      id: descriptor._id,
      content: (
        <>
          <Rearranger
            type="descriptor"
            id={descriptor._id}
            onRearrange={handleRearrange}
          />
          <TypeItem descriptor={descriptor} />
        </>
      ),
    }));

    return withBrackets(
      [
        ...mapItems,
        {
          id: "new",
          content: <AddTypeDescriptor />,
        },
      ],
      Bracket.CURLY
    );
  }, [ownDescriptorsQuery, rearrangeOwnDescriptors]);

  return {
    items,
    isLoading: ownDescriptorsQuery.isLoading,
  };
};

export const DescriptorEditor: React.FC = () => {
  const { isLoading, items } = useItems();
  if (isLoading) return <Loader />;
  return <List items={items} />;
};
