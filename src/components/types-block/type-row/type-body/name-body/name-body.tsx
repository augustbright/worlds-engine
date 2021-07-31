import React from "react";
import { TypePureNameBody } from "types/descriptors";
import TypeBodiesList from "../type-bodies-list";

type OwnProps = {
  body: TypePureNameBody;
};

const NameBody: React.FC<OwnProps> = ({ body }): React.ReactElement => {
  return (
    <>
      <span>{body.name.name}</span>
      {body.params ? <TypeBodiesList params={body.params} /> : null}
    </>
  );
};

export default NameBody;
