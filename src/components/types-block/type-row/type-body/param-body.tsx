import FieldInput from "components/blocks/field-input";
import React, { useCallback } from "react";
import { TypeParamBody } from "types/descriptors";

type OwnProps = {
  body: TypeParamBody;
  onChange: (newBody: TypeParamBody) => void;
};

const ParamBody: React.FC<OwnProps> = ({
  body,
  onChange,
}): React.ReactElement => {
  const handleChange = useCallback(
    (newParam: string) => {
      onChange({
        ...body,
        param: newParam,
      });
    },
    [onChange, body]
  );
  return (
    <>
      <FieldInput value={body.param} onChange={handleChange} />
    </>
  );
};

export const create = (): TypeParamBody => ({
  type: "param",
  param: "",
});

export default ParamBody;
