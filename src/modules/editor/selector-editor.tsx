import React, { useCallback } from "react";
import { TypeBody } from "types/descriptors";
import { MapEditor } from "./map-editor";
import { TypeBodyEditor } from "./type-body-editor/type-body-editor";

type Props = {
  params: Record<string, TypeBody>;
  onChangeParams: (newParams: Record<string, TypeBody>) => void;
  returns: TypeBody;
  onChangeReturns: (newReturns: TypeBody) => void;
};

const emptyParams = {};

export const SelectorEditor: React.FC<Props> = ({
  params,
  onChangeParams,
  returns,
  onChangeReturns,
}) => {
  const handleChangeParams = useCallback(
    (newParams: Record<string, TypeBody>) => {
      onChangeParams(newParams);
    },
    [onChangeParams]
  );

  const handleChangeReturns = useCallback(
    (newReturns: TypeBody) => {
      onChangeReturns(newReturns);
    },
    [onChangeReturns]
  );

  return (
    <>
      <MapEditor map={params || emptyParams} onChange={handleChangeParams} />
      {" => "}
      <TypeBodyEditor body={returns} onChange={handleChangeReturns} />
    </>
  );
};
