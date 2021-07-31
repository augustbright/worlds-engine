import ListBlock from "components/blocks/list-block";
import React from "react";
import { TypePureBody } from "types/descriptors";
import TypeBody from "./type-body";

type OwnProps = {
  params: TypePureBody[];
};

const TypeBodiesList: React.FC<OwnProps> = ({ params }): React.ReactElement => {
  return (
    <ListBlock
      data={params}
      bracketsType="ANGLED"
      getKey={(item) => item.type}
      row={(item) => <TypeBody body={item} />}
    />
  );
};

export default TypeBodiesList;
