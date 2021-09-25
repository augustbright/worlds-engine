import { Id, NameId } from "./common";
import { SystemRef, TypeRefId } from "./ref";

export enum Body {
  REF = "ref",
  MAP = "map",
  PARAM = "param",
  SELECTOR = "selector",
}

export type RefTypeBody = {
  type: Body.REF;
  ref: TypeRefId;
  params?: Record<string, TypeBody>;
};

export type MapTypeBody = {
  type: Body.MAP;
  map: Record<string, TypeBody>;
};

export type ParamTypeBody = {
  type: Body.PARAM;
  param: string;
};

export type SelectorTypeBody = {
  type: Body.SELECTOR;
  params: Record<string, TypeBody>;
  returns: TypeBody;
};

export type TypeBody =
  | null
  | RefTypeBody
  | MapTypeBody
  | ParamTypeBody
  | SelectorTypeBody;

export type TypeDescriptor = {
  _id: Id;
  name: NameId;
  body: TypeBody;
};

export type SystemTypeDescriptor = {
  _id: SystemRef;
  name: NameId;
  params?: Array<string>;
};

export type NotFoundDescriptor = {
  error: Error;
};
