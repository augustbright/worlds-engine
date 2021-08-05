import ListBlock from "components/blocks/list-block";
import React, { useCallback, useMemo } from "react";
import { TypePureBody } from "types/descriptors";
import TypeBody from "./type-body";

type OwnProps = {
  params: Array<TypePureBody>;
  onChange: (newBodies: Array<TypePureBody>) => void;
};

const TypeBodiesList: React.FC<OwnProps> = ({
  params,
  onChange,
}): React.ReactElement => {
  const handleChange = useMemo(
    () => (idx: number, newBody: TypePureBody) => {
      onChange([...params.slice(0, idx), newBody, ...params.slice(idx + 1)]);
    },
    [onChange, params]
  );
  const row = useCallback(
    (item, idx) => (
      <TypeBody
        body={item}
        onChange={(newBody) => handleChange(idx, newBody)}
      />
    ),
    [handleChange]
  );

  return (
    <ListBlock
      data={params}
      bracketsType="ANGLED"
      getKey={(item) => item.type}
      row={row}
    />
  );
};

export default TypeBodiesList;
