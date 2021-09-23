import React, { useCallback } from "react";
import { Body, ParamTypeBody, RefTypeBody, TypeBody } from "types/descriptors";
import { TypeBodySelector } from "./type-body-selector/type-body-selector";
import { ParamsEditor } from "../params-editor";
import { StringEditor } from "../string-editor";
import { ParamValue } from "../word/param-value";

type Props = {
  body: TypeBody;
  onChange: (newBody: TypeBody) => void;
};

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
    editor = <>***MAP EDIT***</>;
  } else if (body.type === Body.SELECTOR) {
    editor = <>***SELECTOR EDIT***</>;
  }

  return (
    <>
      <TypeBodySelector body={body} onSelect={handleSelect} /> {editor}
    </>
  );
};
