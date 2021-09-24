import React, { useCallback } from "react";
import {
  Body,
  MapTypeBody,
  ParamTypeBody,
  RefTypeBody,
  SelectorTypeBody,
  TypeBody,
} from "types/descriptors";
import { TypeBodySelector } from "./type-body-selector/type-body-selector";
import { ParamsEditor } from "../params-editor";
import { StringEditor } from "../string-editor";
import { ParamValue } from "../word/param-value";
import { MapEditor } from "../map-editor";
import { SelectorEditor } from "../selector-editor";

type Props = {
  body: TypeBody;
  onChange: (newBody: TypeBody) => void;
};

const emptyMap = {};

export const TypeBodyEditor: React.FC<Props> = ({ body, onChange }) => {
  const handleSelect = useCallback(
    (newBody: TypeBody) => {
      onChange(newBody);
    },
    [onChange]
  );

  const handleChangeRefParam = useCallback(
    (param: string, newBody: TypeBody) => {
      const refBody = body as RefTypeBody;
      onChange({
        ...refBody,
        params: {
          ...refBody.params,
          [param]: newBody,
        },
      });
    },
    [body, onChange]
  );

  const handleChangeParamValue = useCallback(
    (newValue: string) => {
      const paramBody = body as ParamTypeBody;
      onChange({
        ...paramBody,
        param: newValue,
      });
    },
    [body, onChange]
  );

  const handleChangeMap = useCallback(
    (newMap: Record<string, TypeBody>) => {
      const mapBody = body as MapTypeBody;
      onChange({
        ...mapBody,
        map: newMap,
      });
    },
    [body, onChange]
  );

  const handleChangeSelectorParams = useCallback(
    (newParams: Record<string, TypeBody>) => {
      const selectorBody = body as SelectorTypeBody;
      onChange({
        ...selectorBody,
        params: newParams,
      });
    },
    [body, onChange]
  );
  const handleChangeSelectorReturns = useCallback(
    (newReturns: TypeBody) => {
      const selectorBody = body as SelectorTypeBody;
      onChange({
        ...selectorBody,
        returns: newReturns,
      });
    },
    [body, onChange]
  );

  let editor: React.ReactNode;
  if (!body) {
    editor = null;
  } else if (body.type === Body.REF) {
    const { params } = body;
    editor = params ? (
      <ParamsEditor params={params} onChange={handleChangeRefParam} />
    ) : null;
  } else if (body.type === Body.PARAM) {
    editor = (
      <StringEditor value={body.param} onChange={handleChangeParamValue}>
        <ParamValue>{body.param}</ParamValue>
      </StringEditor>
    );
  } else if (body.type === Body.MAP) {
    editor = (
      <MapEditor map={body.map || emptyMap} onChange={handleChangeMap} />
    );
  } else if (body.type === Body.SELECTOR) {
    editor = (
      <SelectorEditor
        params={body.params}
        returns={body.returns}
        onChangeParams={handleChangeSelectorParams}
        onChangeReturns={handleChangeSelectorReturns}
      />
    );
  }

  return (
    <>
      <TypeBodySelector body={body} onSelect={handleSelect} /> {editor}
    </>
  );
};
