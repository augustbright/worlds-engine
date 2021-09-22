// import { getExternalTypes } from "api/editor";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectSystemDescriptors } from "state/selectors/type-descriptors";
import { ExternalTypeItem } from "./external-type-item";
import { ItemContainer } from "./item-container";
import { SeparatorItem } from "./separator-item";

type Item = {
  name: string;
  author: string;
  separator?: boolean;
};

export const useTypesSelect = () => {
  const systemTypes = useSelector(selectSystemDescriptors);
  const fetch = async (query: string): Promise<Array<Item>> => {
    const externalTypes = [] as Item[]; // await getExternalTypes(query);
    const systemItems = Object.values(systemTypes)
      .filter(
        (systemType) =>
          systemType.name.toLowerCase().search(query.toLowerCase()) >= 0
      )
      .map((item) => ({
        name: item.name,
        author: "system",
      }));

    const result: Array<Item> = [...systemItems];
    if (systemItems.length > 0 && externalTypes.length > 0) {
      result.push({
        name: "separator",
        author: "system",
        separator: true,
      });
    }
    return [...result, ...externalTypes];
  };

  const render = useCallback((item: Item) => {
    return item.separator ? (
      <ItemContainer>
        <SeparatorItem />
      </ItemContainer>
    ) : (
      <ItemContainer>
        <ExternalTypeItem name={item.name} author={item.author} />
      </ItemContainer>
    );
  }, []);

  return { fetch, render };
};
