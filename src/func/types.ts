import {
  Body,
  NotFoundDescriptor,
  SystemTypeDescriptor,
  TypeBody,
  TypeDescriptor,
} from "types/descriptors";
import { SystemRef, TypeRefId } from "types/ref";

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
  return body ? getBodyParams(body).filter(Boolean) : [];
};

export const isSystemRef = (testRef: TypeRefId): testRef is SystemRef => {
  return Object.values(SystemRef).includes(testRef as SystemRef);
};

export const isSystemDescriptor = (
  testDescriptor: TypeDescriptor | SystemTypeDescriptor
): testDescriptor is SystemTypeDescriptor => {
  return isSystemRef(testDescriptor._id);
};

export const isNotFound = (descriptor: any): descriptor is NotFoundDescriptor =>
  !!descriptor.error;

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
