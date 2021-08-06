import TypesSelect from "components/types-select";
import React, { useCallback } from "react";
import { TypePureBody, TypePureNameBody } from "types/descriptors";
import TypeBodiesList from "./type-bodies-list";

type OwnProps = {
  body: TypePureNameBody;
  onChange: (newBody: TypePureNameBody) => void;
};

const NameBody: React.FC<OwnProps> = ({
  body,
  onChange,
}): React.ReactElement => {
  const handleParamsChange = useCallback(
    (newParams: Array<TypePureBody>) => {
      onChange({
        ...body,
        params: newParams,
      });
    },
    [onChange, body]
  );
  return (
    <>
      <TypesSelect item={body} onChange={onChange} />
      {body.params ? (
        <TypeBodiesList params={body.params} onChange={handleParamsChange} />
      ) : null}
    </>
  );
};

export const create = (): TypePureNameBody => ({
  type: "pure-name",
  name: {
    id: "-1",
    name: "",
    owner: "",
  },
});

export default NameBody;
