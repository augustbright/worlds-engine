import { Selector } from "components/editor/selector";
import React, { useCallback, useMemo } from "react";
import {
  Body,
  SystemTypeDescriptor,
  TypeBody,
  TypeDescriptor,
} from "types/descriptors";
import { RefName } from "components/editor/ref-name";
import { assertNever } from "func/common";
import { getSystemTypeDescriptors } from "func/system";
import { getExternalTypes } from "api/editor";
import { getBodyParams, isSystemDescriptor, isSystemRef } from "func/types";
import { Color } from "components/theming";
import { TypeItem, Item } from "./type-item";

type Props = {
  body: TypeBody;
  onSelect: (newBody: TypeBody) => void;
};

const bodyItems: Record<string, Item> = {
  any: {
    id: "any",
    text: "any",
    body: null,
  },

  param: {
    id: "param",
    text: "param",
    body: {
      type: Body.PARAM,
      param: "",
    },
  },

  map: {
    id: "map",
    text: "map",
    body: {
      type: Body.MAP,
      map: {},
    },
  },

  selector: {
    id: "selector",
    text: "selector",
    body: {
      type: Body.SELECTOR,
      params: {},
      returns: null,
    },
  },
};

const useFetchTypes = () => {
  const fetch = async (query: string): Promise<Array<Array<Item>>> => {
    const mapItems = (descriptor: TypeDescriptor | SystemTypeDescriptor) => {
      const paramList = isSystemDescriptor(descriptor)
        ? descriptor.params || []
        : getBodyParams(descriptor.body);
      return {
        id: descriptor._id,
        text: descriptor.name,
        body: {
          type: Body.REF as const,
          ref: descriptor._id,
          params: Object.fromEntries(paramList.map((param) => [param, null])),
        },
      };
    };
    const filterItems = (item: Item) =>
      item.text.toLowerCase().search(query.toLowerCase()) >= 0;

    const typesToItems = (
      descriptors: Array<TypeDescriptor | SystemTypeDescriptor>
    ): Array<Item> => descriptors.map(mapItems).filter(filterItems);

    const systemTypes: Array<SystemTypeDescriptor> = Object.values(
      getSystemTypeDescriptors()
    );

    const externalTypes = await getExternalTypes(query);

    return [
      Object.values(bodyItems).filter(filterItems),
      typesToItems(systemTypes),
      typesToItems(externalTypes),
    ];
  };
  const renderItem = useCallback((item: Item, hover: boolean) => {
    return <TypeItem item={item} hover={hover} />;
  }, []);

  return { fetch, renderItem };
};

export const TypeBodySelector: React.FC<Props> = ({ body, onSelect }) => {
  const handleSelect = useCallback(
    (item: Item) => {
      onSelect(item.body);
    },
    [onSelect]
  );

  const { fetch, renderItem } = useFetchTypes();

  const { text, color } = useMemo(() => {
    if (!body) return { text: "any", color: Color.TEXT_RESERVED };
    if (body.type === Body.MAP)
      return { text: "map", color: Color.TEXT_RESERVED };
    if (body.type === Body.PARAM)
      return { text: "param", color: Color.TEXT_RESERVED };
    if (body.type === Body.SELECTOR)
      return { text: "selector", color: Color.TEXT_RESERVED };
    if (body.type === Body.REF)
      return {
        text: <RefName refId={body.ref} />,
        color: isSystemRef(body.ref) ? Color.TEXT_RESERVED : Color.TEXT_NAME,
      };

    return assertNever(body);
  }, [body]);

  return (
    <Selector
      onSelect={handleSelect}
      fetchKey="type-body-selector-items"
      fetch={fetch}
      renderItem={renderItem}
      color={color}
    >
      {text}
    </Selector>
  );
};
