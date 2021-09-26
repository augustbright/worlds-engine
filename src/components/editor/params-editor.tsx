import { Loader } from "components/common/loader";
import { Pin } from "components/structure/anchor/pin";
import { MapItem } from "components/structure/item/map-item";
import { List, ListItem } from "components/structure/list/list";
import { Bracket, withBrackets } from "components/structure/list/withBrackets";
import {
  getDescriptorParams,
  isSystemDescriptor,
} from "func/types";
import { useRefDescriptor } from "hook/type-descriptors";
import React, { useMemo } from "react";
import { TypeBody } from "types/descriptors";
import { TypeRefId } from "types/ref";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";

type Props = {
  refId: TypeRefId;
  params: Record<string, TypeBody>;
  onChange: (param: string, newBody: TypeBody) => void;
};

const useListItems = (
  params: Record<string, TypeBody>,
  onChange: (param: string, newBody: TypeBody) => void,
  requiredParams: Array<string>
): Array<ListItem> => {
  return useMemo(() => {
    const mapItems = requiredParams.map((key) => {
      return {
        id: key,
        content: (
          <MapItem
            keyContent={<>{key}</>}
            valueContent={
              <Pin path={key}>
                <TypeBodyEditor
                  body={params[key] || null}
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
  }, [params, onChange, requiredParams]);
};

export const ParamsEditor: React.FC<Props> = ({ params, onChange, refId }) => {
  const descriptorQuery = useRefDescriptor(refId);
  const requiredParams = useMemo(() => {
    const descriptor = descriptorQuery.data;
    if (!descriptor) return [];
    if (isSystemDescriptor(descriptor)) {
      return descriptor.params || [];
    }
    return getDescriptorParams(descriptor);
  }, [descriptorQuery]);

  const items = useListItems(params, onChange, requiredParams);

  if (descriptorQuery.isLoading) return <Loader />;
  if (!descriptorQuery.data) return null;
  return <List items={items} />;
};
