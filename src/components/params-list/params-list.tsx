import ListBlock from "components/blocks/list-block";
import React, { useCallback } from "react";
import { TypeParam } from "types/descriptors";

type OwnProps = {
  params: Array<TypeParam>;
};

const ParamsList: React.FC<OwnProps> = ({ params }): React.ReactElement => {
  const row = useCallback((item) => <span>{item}</span>, []);
  return (
    <ListBlock
      data={params}
      bracketsType="ANGLED"
      getKey={(item) => item}
      row={row}
    />
  );
};

export default ParamsList;
