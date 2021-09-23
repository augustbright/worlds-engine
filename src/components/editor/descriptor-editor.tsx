import { Pin } from "components/structure/anchor/pin";
import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import { useTypeDescriptors } from "hook/type-descriptors";
import { noop } from "lodash";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { typeDescriptorsSlice } from "state/slices/type-descriptors";
import { Id } from "types/common";
import { TypeBody, TypeDescriptor } from "types/descriptors";
import { AddItem } from "../structure/item/add-item";
import { MapItem } from "../structure/item/map-item";
import { StringEditor } from "./string-editor";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";
import { Name } from "./word/name";

const useListItems = (
  descriptors: Record<Id, TypeDescriptor>
): Array<ListItem> => {
  const dispatch = useDispatch();
  return useMemo(() => {
    const handleChangeName =
      (descriptor: TypeDescriptor) => (newName: string) => {
        dispatch(
          typeDescriptorsSlice.actions.updateDescriptor({
            id: descriptor._id,
            descriptor: {
              ...descriptor,
              name: newName,
            },
          })
        );
      };

    const handleChangeBody =
      (descriptor: TypeDescriptor) => (newBody: TypeBody) => {
        dispatch(
          typeDescriptorsSlice.actions.updateDescriptor({
            id: descriptor._id,
            descriptor: {
              ...descriptor,
              body: newBody,
            },
          })
        );
      };
    const mapItems = Object.values(descriptors).map((descriptor) => {
      return {
        id: descriptor._id,
        content: (
          <MapItem
            keyContent={
              <StringEditor
                value={descriptor.name}
                onChange={handleChangeName(descriptor)}
              >
                <Name>{descriptor.name}</Name>
              </StringEditor>
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
          content: <AddItem onClick={noop}>Type</AddItem>,
        },
      ],
      Bracket.CURLY
    );
  }, [descriptors, dispatch]);
};

export const DescriptorEditor: React.FC = () => {
  const { descriptors } = useTypeDescriptors();
  const items = useListItems(descriptors);

  return <List items={items} />;
};
