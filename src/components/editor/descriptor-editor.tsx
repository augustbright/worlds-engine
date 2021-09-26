import { Pin } from "components/structure/anchor/pin";
import { List } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import {
  useDeleteOwnDescriptor,
  useOwnDescriptors,
  useUpdateOwnDescriptor,
} from "hook/type-descriptors";
import React, { useMemo } from "react";
import { TypeBody, TypeDescriptor } from "types/descriptors";
import { Color } from "components/theming";
import { Loader } from "components/common/loader";
import { MapItem } from "../structure/item/map-item";
import { StringEditor } from "./string-editor";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";
import { ViewParams } from "./view-params";
import { Name } from "./word/name";
import { AddTypeDescriptor } from "./add-type-descriptor";

export const DescriptorEditor: React.FC = () => {
  const ownDescriptorsQuery = useOwnDescriptors();
  const updateOwnDescriptor = useUpdateOwnDescriptor();
  const deleteOwnDescriptor = useDeleteOwnDescriptor();
  const items = useMemo(() => {
    const handleChangeName =
      (descriptor: TypeDescriptor) => (newName: string) => {
        if (!newName) {
          deleteOwnDescriptor.mutate(descriptor._id);
          return;
        }
        updateOwnDescriptor.mutate({
          ...descriptor,
          name: newName,
        });
      };

    const handleChangeBody =
      (descriptor: TypeDescriptor) => (newBody: TypeBody) => {
        updateOwnDescriptor.mutate({
          ...descriptor,
          body: newBody,
        });
      };

    const descriptors = ownDescriptorsQuery.data || [];

    const mapItems = Object.values(descriptors).map((descriptor) => {
      return {
        id: descriptor._id,
        content: (
          <MapItem
            keyContent={
              <>
                <StringEditor
                  value={descriptor.name}
                  onChange={handleChangeName(descriptor)}
                >
                  <Name color={Color.TEXT_TYPE_NAME}>{descriptor.name}</Name>
                </StringEditor>
                <ViewParams descriptor={descriptor} />
              </>
            }
            valueContent={
              <Pin path={descriptor.name}>
                {" "}
                <TypeBodyEditor
                  body={descriptor.body}
                  onChange={handleChangeBody(descriptor)}
                />
              </Pin>
            }
          />
        ),
      };
    });

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
  }, [ownDescriptorsQuery, deleteOwnDescriptor, updateOwnDescriptor]);

  if (ownDescriptorsQuery.isLoading) return <Loader />;
  return <List items={items} />;
};
