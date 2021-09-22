import { Pin } from "components/structure/anchor/pin";
import { MapItem } from "components/structure/item/map-item";
import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import React, { useMemo } from "react";
import { TypeBody } from "types/descriptors";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";

type Props = {
  params: Record<string, TypeBody | undefined>;
};

const useListItems = (
  params: Record<string, TypeBody | undefined>
): Array<ListItem> => {
  return useMemo(() => {
    const mapItems = Object.entries(params).map(([key, param]) => {
      return {
        id: key,
        content: (
          <MapItem
            keyContent={<>{key}</>}
            valueContent={
              <Pin path={key}>
                <TypeBodyEditor body={param || undefined} />
              </Pin>
            }
          />
        ),
      };
    });
    return withBrackets(mapItems, Bracket.ANGLE);
  }, [params]);
};

export const ParamsEditor: React.FC<Props> = ({ params }) => {
  const items = useListItems(params);
  return <List items={items} />;
};
