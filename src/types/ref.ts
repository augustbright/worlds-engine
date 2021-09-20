import { Id } from "./common";

export enum SystemRef {
  BOOLEAN = "__type_boolean",
  NUMBER = "__type_number",
  STRING = "__type_string",
  LIST = "__type_list",
}

export type TypeRefId = Id | SystemRef;
