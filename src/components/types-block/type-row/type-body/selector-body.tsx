import MapBlock from "components/blocks/map-block";
import React, { useCallback, useMemo } from "react";
import { TypePureBody, TypeSelectorBody } from "types/descriptors";
import TypeBody from "./type-body";

type OwnProps = {
  body: TypeSelectorBody;
  onChange: (newBody: TypeSelectorBody) => void;
};

const SelectorBody: React.FC<OwnProps> = ({
  body,
  onChange,
}): React.ReactElement => {
  const handleChangeParam = useMemo(
    () => (key: string, newBody: TypePureBody) => {
      onChange({
        ...body,
        params: {
          ...body.params,
          [key]: newBody,
        },
      });
    },
    [onChange, body]
  );
  const renderValue = useCallback(
    (value: TypePureBody, key: string) => (
      <TypeBody
        body={value}
        onChange={(newBody) => handleChangeParam(key, newBody)}
      />
    ),
    [handleChangeParam]
  );

  const handleChangeReturns = useCallback(
    (newBody: TypePureBody) => {
      onChange({
        ...body,
        returns: newBody,
      });
    },
    [onChange, body]
  );

  const handleParamsChange = useCallback(
    (newParams: Record<string, TypePureBody>) => {
      onChange({
        ...body,
        params: newParams,
      });
    },
    [onChange, body]
  );

  const handleParamsAdd = useMemo(() => {
    if ("" in body.params) {
      return undefined;
    }
    return () => {
      onChange({
        ...body,
        params: {
          ...body.params,
          "": {} as TypePureBody,
        },
      });
    };
  }, [body, onChange]);

  return (
    <>
      <MapBlock
        bracketsType="ROUND"
        data={body.params}
        renderValue={renderValue}
        onChange={handleParamsChange}
        onAdd={handleParamsAdd}
      />
      <span>{"=>"}</span>
      <TypeBody body={body.returns} onChange={handleChangeReturns} />
    </>
  );
};

export const create = (): TypeSelectorBody => ({
  type: "selector",
  params: {},
  returns: {
    type: "pure-name",
    name: {
      id: "-1",
      name: "",
      owner: "",
    },
  },
});

export default SelectorBody;
