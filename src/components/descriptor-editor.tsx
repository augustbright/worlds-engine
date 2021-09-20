import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import { useTypeDescriptors } from "hook/type-descriptors";
import React, { useMemo } from "react";
import { Id } from "types/common";
import { TypeDescriptor } from "types/descriptors";
import { MapItem } from "./structure/item/map-item";
import { Pinnable } from "./structure/item/pinnable";
import { ListViewer } from "./structure/list/list-viewer";

const useListItems = (
  descriptors: Record<Id, TypeDescriptor>
): Array<ListItem> => {
  return useMemo(
    () =>
      withBrackets(
        Object.values(descriptors).map((descriptor) => {
          return {
            id: descriptor._id,
            content: (navigate) => {
              if (navigate) {
                return String(descriptor.body?.type);
              }
              return (
                <MapItem
                  keyContent={descriptor.name}
                  valueContent={
                    <Pinnable>{String(descriptor.body?.type)}</Pinnable>
                  }
                />
              );
            },
          };
        }),
        Bracket.CURLY
      ),
    [descriptors]
  );
};

export const DescriptorEditor: React.FC = () => {
  const { descriptors } = useTypeDescriptors();
  const items = useListItems(descriptors);

  return (
    <ListViewer>
      <List items={items} />
    </ListViewer>
  );
};
