import React from "react";
import { TypeParamBody } from "types/descriptors";

type OwnProps = {
  body: TypeParamBody;
};

const ParamBody: React.FC<OwnProps> = ({ body }): React.ReactElement => {
  return (
    <>
      <span>{body.param}</span>
    </>
  );
};

export default ParamBody;
