import { Pin } from "components/structure/anchor/pin";
import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import { useTypeDescriptors } from "hook/type-descriptors";
import { noop } from "lodash";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { typeDescriptorsSlice } from "state/slices/type-descriptors";
import { Id } from "types/common";
import { TypeDescriptor } from "types/descriptors";
import { AddItem } from "../structure/item/add-item";
import { MapItem } from "../structure/item/map-item";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";

const useListItems = (
  descriptors: Record<Id, TypeDescriptor>
): Array<ListItem> => {
  const dispatch = useDispatch();
  return useMemo(() => {
    const mapItems = Object.values(descriptors).map((descriptor) => {
      return {
        id: descriptor._id,
        content: (
          <MapItem
            keyContent={descriptor.name}
            valueContent={
              <Pin path={descriptor.name}>
                {" "}
                <TypeBodyEditor
                  body={descriptor.body}
                  onChange={(newBody) => {
                    dispatch(
                      typeDescriptorsSlice.actions.updateDescriptor({
                        id: descriptor._id,
                        descriptor: {
                          ...descriptor,
                          body: newBody,
                        },
                      })
                    );
                  }}
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
