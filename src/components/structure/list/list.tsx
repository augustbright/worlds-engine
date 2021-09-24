import React, { useCallback } from "react";
import { TabProvider, useTabContext } from "../tab-context";
import { ListItem } from "../item/list-item";

export type ListItem = {
  id: string;
  content: React.ReactNode;
};

type Props = {
  items: Array<ListItem>;
};

export const List: React.FC<Props> = ({ items }) => {
  const { level } = useTabContext();

  const itemsMapFn = useCallback(
    (item: ListItem, index) => {
      const isFirst = index === 0;
      const isLast = index === items.length - 1;
      const inline = items.length < 4 || isFirst || isLast;
      const indent = items.length > 3 && !isFirst && !isLast ? 1 : 0;
      const intended = items.length > 3 && !isFirst;

      const tabContextValue = {
        level: level + indent,
      };

      return (
        <TabProvider value={tabContextValue}>
          <ListItem
            indented={intended}
            inline={inline}
            id={item.id}
            key={item.id}
          >
            {item.content}
          </ListItem>
        </TabProvider>
      );
    },
    [items, level]
  );

  return <>{items.map(itemsMapFn)}</>;
};
