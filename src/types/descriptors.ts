import { NameId } from './common';

type TypePureNameBody = {
  type: 'pure-name';
  name: NameId;
  params?: Array<TypePureBody>;
};

type TypeEffectNameBody = {
  type: 'effect-name';
  name: NameId;
  params?: Array<TypeEffectBody>;
};

type TypePureMapBody = {
  type: 'pure-map';
  map: Record<string, TypePureBody>;
};

type TypeEffectMapBody = {
  type: 'effect-map';
  map: Record<string, TypeEffectBody>;
};

type TypeParamBody = {
  type: 'param';
  param: string;
};

type TypeSelectorBody = {
  type: 'selector';
  params: TypePureMapBody;
  returns: TypePureBody;
};

type TypeActionBody = {
  type: 'action';
  params: TypeEffectMapBody;
  returns: TypeEffectBody;
};

type TypePureBody =
  | TypePureNameBody
  | TypePureMapBody
  | TypeParamBody
  | TypeSelectorBody;
type TypeEffectBody =
  | TypePureBody
  | TypeEffectNameBody
  | TypeEffectMapBody
  | TypeActionBody;

export type PureTypeDescriptor = {
  name: string;
  body: TypePureBody;
};

export type EffectTypeDescriptor = {
  name: string;
  body: TypeEffectBody;
};

type ValueNumberType = {
  type: 'number';
  number: number;
};

type ValueStringType = {
  type: 'string';
  string: string;
};

type ValueBooleanType = {
  type: 'boolean';
  boolean: boolean;
};

type ValueMapType = {
  type: 'map';
  map: Record<string, ValueType>;
};

type ValueListType = {
  type: 'list';
  entityType: NameId;
  list: Array<ValueType>;
};

type ValueSelectorType = {
  type: 'selector';
  selector: NameId;
};

type ValueType =
  | ValueNumberType
  | ValueStringType
  | ValueBooleanType
  | ValueMapType
  | ValueListType
  | ValueSelectorType;

type SelectorNameBody = {
  type: 'name';
  name: NameId;
  params: Record<string, SelectorBody>;
};

type SelectorValueBody = {
  type: 'value';
  value: ValueType;
};

type SelectorParamBody = {
  type: 'param';
  param: string;
};

type SelectorBody = SelectorNameBody | SelectorValueBody | SelectorParamBody;

export type SelectorDescriptor = {
  name: string;
  body: SelectorBody;
  params: Record<string, TypePureBody>;
  returnType: TypePureBody;
  description?: string;
};

type EffectStep = {
  type: 'effect';
  name: NameId;
  params: Record<string, SelectorBody>;
};

type DecisionStep = {
  type: 'decision';
  condition: SelectorBody;
  true: Array<ActionStep>;
  false: Array<ActionStep>;
};

type ActionStep = EffectStep | DecisionStep;

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
