import { ExternalTypeDescriptor } from "types/descriptors";
import { SystemRef } from "types/ref";

export const systemTypeDescriptors: Record<SystemRef, ExternalTypeDescriptor> =
  {
    [SystemRef.BOOLEAN]: {
      _id: SystemRef.BOOLEAN,
      name: "Boolean",
    },
    [SystemRef.NUMBER]: {
      _id: SystemRef.NUMBER,
      name: "Number",
    },
    [SystemRef.STRING]: {
      _id: SystemRef.NUMBER,
      name: "String",
    },
    [SystemRef.LIST]: {
      _id: SystemRef.LIST,
      name: "List",
      params: ["type"],
    },
  };
