import { useRefDescriptor } from "hook/type-descriptors";
import React, { useMemo } from "react";
import { RefTypeBody } from "types/descriptors";
import { ParamsEditor } from "../params-editor";
import { TypeBodySelector } from "../type-body-selector";

type Props = {
  body: RefTypeBody;
};

export const RefTypeBodyEditor: React.FC<Props> = ({ body }) => {
  const descriptor = useRefDescriptor(body.ref);

  const paramsEditor = useMemo(() => {
    if (!descriptor) return null;
    const { params } = descriptor;
    if (!params) return null;
    return (
      <ParamsEditor
        params={Object.fromEntries(params.map((param) => [param, undefined]))}
      />
    );
  }, [descriptor]);
  return (
    <>
      <TypeBodySelector>{descriptor?.name || "<unnamed>"}</TypeBodySelector>
      {paramsEditor}
    </>
  );
};
