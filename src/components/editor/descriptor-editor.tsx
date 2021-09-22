import { Pin } from "components/structure/anchor/pin";
import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import { useTypeDescriptors } from "hook/type-descriptors";
import { noop } from "lodash";
import React, { useMemo } from "react";
import { Id } from "types/common";
import { TypeDescriptor } from "types/descriptors";
import { AddItem } from "../structure/item/add-item";
import { MapItem } from "../structure/item/map-item";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";

const useListItems = (
  descriptors: Record<Id, TypeDescriptor>
): Array<ListItem> => {
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
                <TypeBodyEditor body={descriptor.body} />
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
  }, [descriptors]);
};

export const DescriptorEditor: React.FC = () => {
  const { descriptors } = useTypeDescriptors();
  const items = useListItems(descriptors);

  return <List items={items} />;
};
