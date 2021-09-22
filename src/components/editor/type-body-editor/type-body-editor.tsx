import React from "react";
import { Body, TypeBody } from "types/descriptors";
import { TypeBodySelector } from "./type-body-selector/type-body-selector";
import { RefTypeBodyEditor } from "./ref";

type Props = {
  body?: TypeBody;
};

export const TypeBodyEditor: React.FC<Props> = ({ body }) => {
  let editor: React.ReactNode;
  if (!body) {
    editor = <TypeBodySelector text="any" />;
  } else if (body.type === Body.REF) {
    editor = <RefTypeBodyEditor body={body} />;
  } else {
    editor = <>{String(body.type)}</>;
  }

  return <>{editor}</>;
};
