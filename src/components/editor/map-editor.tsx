import { AddItem } from "components/common/add-item";
import { MapItem } from "components/structure/item/map-item";
import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/with-brackets";
import React, { useCallback, useMemo, useState } from "react";
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
  const [collapsed, setCollapsed] = useState(false);
  const handleToggle = useCallback(
    (listCollapsed: boolean) => {
      setCollapsed(listCollapsed);
    },
    [setCollapsed]
  );

  return useMemo(() => {
    const handleChangeKey = (index: number) => (newKey: string) => {
      if (!newKey) {
        onChange(
          Object.fromEntries(
            Object.entries(map).filter(
              (_entry, entryIndex) => entryIndex !== index
            )
          )
        );
        return;
      }

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

    const handleNewItem = (name: string) => {
      if (!name) return;
      onChange({
        ...map,
        [name]: null,
      });
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
              <TypeBodyEditor
                body={value}
                onChange={handleChangeValue(index)}
              />
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
          content: <AddItem onNewItem={handleNewItem}>Field</AddItem>,
        },
      ],
      Bracket.CURLY,
      {
        collapsed,
        onToggle: handleToggle,
      }
    );
  }, [map, onChange, collapsed, handleToggle]);
};

export const MapEditor: React.FC<Props> = ({ map, onChange }) => {
  const items = useListItems(map, onChange);

  return <List items={items} />;
};
