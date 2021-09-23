import { List } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import { getDescriptorParams } from "func/types";
import React, { useMemo } from "react";
import { TypeDescriptor } from "types/descriptors";
import { ParamValue } from "./word/param-value";

type Props = {
  descriptor: TypeDescriptor;
};

const useListItems = (descriptor: TypeDescriptor) =>
  useMemo(() => {
    const params = getDescriptorParams(descriptor);
    return {
      items: withBrackets(
        params.map((param) => ({
          id: param,
          content: <ParamValue>{param}</ParamValue>,
        })),
        Bracket.ANGLE
      ),
      empty: !params.length,
    };
  }, [descriptor]);

export const ViewParams: React.FC<Props> = ({ descriptor }) => {
  const { empty, items } = useListItems(descriptor);
  return empty ? null : <List items={items} />;
};
