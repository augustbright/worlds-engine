import { getExternalTypes } from "api/editor";
import { joinListsWithSeparator } from "func/common";
import { getDescriptorParams } from "func/types";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectSystemDescriptors,
  selectTypeDescriptors,
} from "state/selectors/type-descriptors";
import { Body, TypeBody, TypeDescriptor } from "types/descriptors";
import { ExternalTypeItem } from "./external-type-item";
import { ItemContainer } from "./item-container";
import { SeparatorItem } from "./separator-item";

export type Item = {
  id: string;
  name: string;
  author: string;
  separator?: boolean;
  params: Array<string>;
  body: TypeBody;
};

type HocProps = {
  onSelect: (item: Item) => void;
};

export const useTypesSelect = ({ onSelect }: HocProps) => {
  const systemTypes = useSelector(selectSystemDescriptors);
  const ownDescriptors = useSelector(selectTypeDescriptors);
  const ownDescriptorsList = useMemo(
    () => Object.values(ownDescriptors),
    [ownDescriptors]
  );

  const fetch = useCallback(
    async (query: string): Promise<Array<Item>> => {
      const systemSearchable: Array<{ name: string; item: Item }> = [
        {
          name: "any",
          item: {
            id: "any",
            name: "any",
            author: "system",
            params: [],
            body: null,
          },
        },
        {
          name: "param",
          item: {
            id: "param",
            name: "param",
            author: "system",
            params: [],
            body: {
              type: Body.PARAM,
              param: "",
            },
          },
        },
        ...Object.values(systemTypes).map((item) => ({
          name: item.name,
          item: {
            id: item._id,
            name: item.name,
            author: "system",
            params: item.params || [],
            body: {
              type: Body.REF as const,
              ref: item._id,
              name: item.name,
              params:
                item.params && item.params.length
                  ? Object.fromEntries(
                      item.params?.map((param) => [param, null])
                    )
                  : undefined,
            },
          },
        })),
        {
          name: "map",
          item: {
            id: "map",
            name: "map",
            author: "system",
            params: [],
            body: {
              type: Body.MAP,
              map: {},
            },
          },
        },
        {
          name: "selector",
          item: {
            id: "selector",
            name: "selector",
            author: "system",
            params: [],
            body: {
              type: Body.SELECTOR,
              params: {},
              returns: null,
            },
          },
        },
      ];
      const systemItems = systemSearchable
        .filter(
          (systemType) =>
            systemType.name.toLowerCase().search(query.toLowerCase()) >= 0
        )
        .map(({ item }) => item);

      const externalTypes = query ? await getExternalTypes(query) : [];
      const convertToItems = (
        descriptors: Array<TypeDescriptor>
      ): Array<Item> =>
        descriptors.map((item) => {
          const params = getDescriptorParams(item);
          return {
            id: item._id,
            name: item.name,
            author: "user",
            params,
            body: {
              type: Body.REF,
              ref: item._id,
              name: item.name,
              params: params.length
                ? Object.fromEntries(
                    params.map((param: string) => [param, null])
                  )
                : undefined,
            },
          };
        });

      const externalItems = convertToItems(externalTypes);
      const ownItems = convertToItems(ownDescriptorsList).filter(
        (ownItem) => ownItem.name.toLowerCase().search(query.toLowerCase()) >= 0
      );
      return joinListsWithSeparator(
        {
          id: "separator",
          name: "separator",
          author: "system",
          separator: true,
          params: [],
          body: null,
        },
        systemItems,
        ownItems,
        externalItems
      );
    },
    [ownDescriptorsList, systemTypes]
  );

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
