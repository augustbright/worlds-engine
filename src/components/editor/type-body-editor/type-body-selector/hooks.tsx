import { getExternalTypes } from "api/editor";
import { descriptorToExternal } from "func/types";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectSystemDescriptors } from "state/selectors/type-descriptors";
import { ExternalTypeItem } from "./external-type-item";
import { ItemContainer } from "./item-container";
import { SeparatorItem } from "./separator-item";

export type Item = {
  id: string;
  name: string;
  author: string;
  separator?: boolean;
  params: Array<string>;
};

type HocProps = {
  onSelect: (item: Item) => void;
};

export const useTypesSelect = ({ onSelect }: HocProps) => {
  const systemTypes = useSelector(selectSystemDescriptors);
  const fetch = async (query: string): Promise<Array<Item>> => {
    const systemItems = Object.values(systemTypes)
      .filter(
        (systemType) =>
          systemType.name.toLowerCase().search(query.toLowerCase()) >= 0
      )
      .map((item) => ({
        id: item._id,
        name: item.name,
        author: "system",
        params: item.params || [],
      }));

    const externalTypes = await getExternalTypes(query);
    const externalItems = externalTypes
      .map((externalType) => descriptorToExternal(externalType))
      .map((item) => ({
        id: item._id,
        name: item.name,
        author: "user",
        params: item.params || [],
      }));

    const result: Array<Item> = [...systemItems];
    if (systemItems.length > 0 && externalTypes.length > 0) {
      result.push({
        id: "separator",
        name: "separator",
        author: "system",
        separator: true,
        params: [],
      });
    }
    return [...result, ...externalItems];
  };

  const render = useCallback(
    (item: Item) => {
      return item.separator ? (
        <ItemContainer>
          <SeparatorItem />
        </ItemContainer>
      ) : (
        <ItemContainer>
          <ExternalTypeItem
            onClick={() => onSelect(item)}
            name={item.name}
            author={item.author}
            params={item.params}
          />
        </ItemContainer>
      );
    },
    [onSelect]
  );

  return { fetch, render };
};
