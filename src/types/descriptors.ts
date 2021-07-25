import { NameId } from "./common";

export type TypePureNameBody = {
  type: "pure-name";
  name: NameId;
  params?: Array<TypePureBody>;
};

export type TypeEffectNameBody = {
  type: "effect-name";
  name: NameId;
  params?: Array<TypeEffectBody>;
};

export type TypePureMapBody = {
  type: "pure-map";
  map: Record<string, TypePureBody>;
};

export type TypeEffectMapBody = {
  type: "effect-map";
  map: Record<string, TypeEffectBody>;
};

export type TypeParamBody = {
  type: "param";
  param: string;
};

export type TypeSelectorBody = {
  type: "selector";
  params: Record<string, TypePureBody>;
  returns: TypePureBody;
};

export type TypeActionBody = {
  type: "action";
  params: TypeEffectMapBody;
  returns: TypeEffectBody;
};

export type TypePureBody =
  | TypePureNameBody
  | TypePureMapBody
  | TypeParamBody
  | TypeSelectorBody;
export type TypeEffectBody =
  | TypePureBody
  | TypeEffectNameBody
  | TypeEffectMapBody
  | TypeActionBody;

export type PureTypeDescriptor = {
  name: string;
  params?: Array<string>;
  body: TypePureBody;
};

export type EffectTypeDescriptor = {
  name: string;
  body: TypeEffectBody;
};

export type ValueNumberType = {
  type: "number";
  number: number;
};

export type ValueStringType = {
  type: "string";
  string: string;
};

export type ValueBooleanType = {
  type: "boolean";
  boolean: boolean;
};

export type ValueMapType = {
  type: "map";
  map: Record<string, ValueType>;
};

export type ValueListType = {
  type: "list";
  entityType: NameId;
  list: Array<ValueType>;
};

export type ValueSelectorType = {
  type: "selector";
  selector: NameId;
};

export type ValueType =
  | ValueNumberType
  | ValueStringType
  | ValueBooleanType
  | ValueMapType
  | ValueListType
  | ValueSelectorType;

export type SelectorNameBody = {
  type: "name";
  name: NameId;
  params: Record<string, SelectorBody>;
};

export type SelectorValueBody = {
  type: "value";
  value: ValueType;
};

export type SelectorParamBody = {
  type: "param";
  param: string;
};

export type SelectorBody = SelectorNameBody | SelectorValueBody | SelectorParamBody;

export type SelectorDescriptor = {
  name: string;
  body: SelectorBody;
  params: Record<string, TypePureBody>;
  returnType: TypePureBody;
  description?: string;
};

export type EffectStep = {
  type: "effect";
  name: NameId;
  params: Record<string, SelectorBody>;
};

export type DecisionStep = {
  type: "decision";
  condition: SelectorBody;
  true: Array<ActionStep>;
  false: Array<ActionStep>;
};

export type ActionStep = EffectStep | DecisionStep;

export type ActionDescriptor = {
  name: string;
  steps: Array<ActionStep>;
  description?: string;
};

export type EntityDescriptor = {
  name: string;
  strategy: NameId;
  description?: string;
};
