import {
  Body,
  ExternalTypeDescriptor,
  TypeBody,
  TypeDescriptor,
} from "types/descriptors";

export const getBodyParams = (body: TypeBody): Array<string> => {
  const getMapParams = (map?: Record<string, TypeBody>): Array<string> => {
    if (!map) {
      return [];
    }
    return Array.from(
      new Set(
        Object.values(map)
          .map((valueBody) => getBodyParams(valueBody))
          .flat()
      )
    );
  };

  if (body.type === Body.PARAM) {
    return [body.param];
  }
  if (body.type === Body.REF) {
    const { params } = body;
    return getMapParams(params);
  }
  if (body.type === Body.MAP) {
    const { map } = body;
    return getMapParams(map);
  }
  if (body.type === Body.SELECTOR) {
    const { params, returns } = body;
    return Array.from(
      new Set([...getMapParams(params), ...getBodyParams(returns)])
    );
  }
  return [];
};

export const getDescriptorParams = (
  descriptor: TypeDescriptor
): Array<string> => {
  const { body } = descriptor;
  return body ? getBodyParams(body) : [];
};

export const descriptorToExternal = (
  descriptor: TypeDescriptor
): ExternalTypeDescriptor => {
  return {
    _id: descriptor._id,
    name: descriptor.name,
    params: getDescriptorParams(descriptor),
  };
};
