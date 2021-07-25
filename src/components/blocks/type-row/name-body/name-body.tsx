import React from "react";
import { TypePureNameBody } from "types/descriptors";

type OwnProps = {
  body: TypePureNameBody;
};

const NameBody: React.FC<OwnProps> = ({ body }): JSX.Element => {
  return (
    <>
      <span>{body.name.name}</span>
      <span>{body.name.owner}</span>
      {body.params}
    </>
  );
};

export default NameBody;
