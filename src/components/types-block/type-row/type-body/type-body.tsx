import React from "react";
import { TypePureBody } from "types/descriptors";
import NameBody from "./name-body";

type OwnProps = {
  body: TypePureBody;
};

const TypeBody: React.FC<OwnProps> = ({ body }) => {
  if (body.type === "pure-name") {
    return <NameBody body={body} />;
  }
  return <span>{body.type}</span>;
};

export default TypeBody;
