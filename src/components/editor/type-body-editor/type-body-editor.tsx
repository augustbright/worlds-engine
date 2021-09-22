import React, { useCallback } from "react";
import { Body, RefTypeBody, TypeBody } from "types/descriptors";
import { TypeBodySelector } from "./type-body-selector/type-body-selector";
import { ParamsEditor } from "../params-editor";

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

  const handleChangeParam = useCallback(
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

  let editor: React.ReactNode;
  if (!body) {
    editor = null;
  } else if (body.type === Body.REF) {
    const { params } = body;
    editor = params ? (
      <ParamsEditor params={params} onChange={handleChangeParam} />
    ) : null;
  } else if (body.type === Body.PARAM) {
    editor = <>***PARAM EDIT***</>;
  } else if (body.type === Body.MAP) {
    editor = <>***MAP EDIT***</>;
  } else if (body.type === Body.SELECTOR) {
    editor = <>***SELECTOR EDIT***</>;
  }

  return (
    <>
      <TypeBodySelector body={body} onSelect={handleSelect} />
      {editor}
    </>
  );
};
