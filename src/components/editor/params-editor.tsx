import { Pin } from "components/structure/anchor/pin";
import { MapItem } from "components/structure/item/map-item";
import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import React, { useMemo } from "react";
import { TypeBody } from "types/descriptors";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";

type Props = {
  params: Record<string, TypeBody>;
  onChange: (param: string, newBody: TypeBody) => void;
};

const useListItems = (
  params: Record<string, TypeBody>,
  onChange: (param: string, newBody: TypeBody) => void
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
                <TypeBodyEditor
                  body={param}
                  onChange={(newBody) => {
                    onChange(key, newBody);
                  }}
                />
              </Pin>
            }
          />
        ),
      };
    });
    return withBrackets(mapItems, Bracket.ANGLE);
  }, [params, onChange]);
};

export const ParamsEditor: React.FC<Props> = ({ params, onChange }) => {
  const items = useListItems(params, onChange);
  return <List items={items} />;
};
