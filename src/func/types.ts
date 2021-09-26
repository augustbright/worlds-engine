import {
  Body,
  SystemTypeDescriptor,
  TypeBody,
  TypeDescriptor,
} from "types/descriptors";
import { SystemRef, TypeRefId } from "types/ref";
import { getSystemTypeDescriptors } from "./system";

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

  if (!body) return [];

  if (body.type === Body.PARAM) {
    return body.param ? [body.param] : [];
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

export const isSystemRef = (testRef: TypeRefId): testRef is SystemRef => {
  return Object.values(SystemRef).includes(testRef as SystemRef);
};

export const isSystemDescriptor = (
  testDescriptor: TypeDescriptor | SystemTypeDescriptor
): testDescriptor is SystemTypeDescriptor => {
  return isSystemRef(testDescriptor._id);
};

export const getDescriptorParams = (
  descriptor: TypeDescriptor | SystemTypeDescriptor
): Array<string> => {
  if (isSystemDescriptor(descriptor)) {
    const systemDescriptor = getSystemTypeDescriptors()[descriptor._id];
    return systemDescriptor.params || [];
  }
  const { body } = descriptor;
  return body ? getBodyParams(body).filter(Boolean) : [];
};

export const bodyWithoutRef = (body: TypeBody, ref: TypeRefId): TypeBody => {
  if (!body) return body;
  if (body.type === Body.PARAM) return body;

  if (body.type === Body.REF) {
    if (body.ref === ref) return null;
    return body;
  }

  if (body.type === Body.MAP) {
    return {
      type: Body.MAP,
      map: Object.fromEntries(
        Object.entries(body.map).map(([key, value]) => [
          key,
          bodyWithoutRef(value, ref),
        ])
      ),
    };
  }

  if (body.type === Body.SELECTOR) {
    return {
      type: Body.SELECTOR,
      params: Object.fromEntries(
        Object.entries(body.params).map(([key, value]) => [
          key,
          bodyWithoutRef(value, ref),
        ])
      ),
      returns: bodyWithoutRef(body.returns, ref),
    };
  }

  const never: never = body;
  return never;
};

export const getBodyRefs = (body: TypeBody): Array<TypeRefId> => {
  if (!body) return [];
  if (body.type === Body.PARAM) return [];

  if (body.type === Body.REF) {
    return [body.ref];
  }

  if (body.type === Body.MAP) {
    return Array.from(
      new Set(
        Object.values(body.map)
          .map((value) => getBodyRefs(value))
          .flat()
      )
    );
  }

  if (body.type === Body.SELECTOR) {
    return Array.from(
      new Set([
        ...Object.values(body.params)
          .map((value) => getBodyRefs(value))
          .flat(),
        ...getBodyRefs(body.returns),
      ])
    );
  }

  const never: never = body;
  return never;
};

export const getDescriptorRefs = (
  descriptor: TypeDescriptor
): Array<TypeRefId> => getBodyRefs(descriptor.body);
