import { Pin } from "components/structure/anchor/pin";
import { AddItem } from "components/structure/item/add-item";
import { MapItem } from "components/structure/item/map-item";
import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import { noop } from "lodash";
import React, { useMemo } from "react";
import { TypeBody } from "types/descriptors";
import { StringEditor } from "./string-editor";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";
import { Name } from "./word/name";

type Props = {
  map: Record<string, TypeBody>;
  onChange: (newMap: Record<string, TypeBody>) => void;
};

const useListItems = (
  map: Record<string, TypeBody>,
  onChange: (newMap: Record<string, TypeBody>) => void
): Array<ListItem> => {
  return useMemo(() => {
    const handleChangeKey = (index: number) => (newKey: string) => {
      onChange(
        Object.fromEntries(
          Object.entries(map).map(([key, value], entryIndex) => {
            if (entryIndex === index) {
              return [newKey, value];
            }
            return [key, value];
          })
        )
      );
    };
    const handleChangeValue = (index: number) => (newValue: TypeBody) => {
      onChange(
        Object.fromEntries(
          Object.entries(map).map(([key, value], entryIndex) => {
            if (entryIndex === index) {
              return [key, newValue];
            }
            return [key, value];
          })
        )
      );
    };

    const mapItems = Object.entries(map).map(([key, value], index) => {
      return {
        id: `${index}:${key}`,
        content: (
          <MapItem
            keyContent={
              <StringEditor value={key} onChange={handleChangeKey(index)}>
                <Name>{key}</Name>
              </StringEditor>
            }
            valueContent={
              <Pin path={`${index}:${key}`}>
                {" "}
                <TypeBodyEditor
                  body={value}
                  onChange={handleChangeValue(index)}
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
          content: <AddItem onClick={noop}>Field</AddItem>,
        },
      ],
      Bracket.CURLY
    );
  }, [map, onChange]);
};

export const MapEditor: React.FC<Props> = ({ map, onChange }) => {
  const items = useListItems(map, onChange);

  return <List items={items} />;
};
