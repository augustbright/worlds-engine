import TypesSelect from "components/types-select";
import React from "react";
import { TypePureNameBody } from "types/descriptors";
import TypeBodiesList from "./type-bodies-list";

type OwnProps = {
  body: TypePureNameBody;
};

const NameBody: React.FC<OwnProps> = ({ body }): React.ReactElement => {
  return (
    <>
      <TypesSelect item={body} />
      {body.params ? <TypeBodiesList params={body.params} /> : null}
    </>
  );
};

export default NameBody;
