import React from "react";
import { Body, TypeBody } from "types/descriptors";
import { RefTypeBodyEditor } from "./type-body/ref";

type Props = {
  body?: TypeBody;
};

export const TypeBodyEditor: React.FC<Props> = ({ body }) => {
  if (!body) {
    return null;
  }

  if (body.type === Body.REF) {
    return <RefTypeBodyEditor body={body} />;
  }
  return <>{String(body.type)}</>;
};
