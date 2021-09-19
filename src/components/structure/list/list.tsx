import React, { useCallback } from "react";
import { TabProvider, useTabContext } from "../tab-context";
import { ListItem } from "../item/list-item";

export type ListItem = {
  id: string;
  content: React.ReactNode;
  path?: boolean;
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
      const inline = items.length < 4 || isFirst;
      const indent = inline || isLast ? 0 : 1;

      const tabContextValue = {
        level: level + indent,
      };

      return (
        <TabProvider value={tabContextValue}>
          <ListItem inline={inline} id={item.id} key={item.id}>
            {item.content}
          </ListItem>
        </TabProvider>
      );
    },
    [items, level]
  );

  return <>{items.map(itemsMapFn)}</>;
};
