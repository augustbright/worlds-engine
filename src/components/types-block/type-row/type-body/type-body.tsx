import React from "react";
import { TypePureBody } from "types/descriptors";
import NameBody from "./name-body";
import MapBody from "./map-body";
import SelectorBody from "./selector-body";

type OwnProps = {
  body: TypePureBody;
};

const TypeBody: React.FC<OwnProps> = ({ body }) => {
  if (body.type === "pure-name") {
    return <NameBody body={body} />;
  }
  if (body.type === "pure-map") {
    return <MapBody body={body} />;
  }
  if (body.type === "selector") {
    return <SelectorBody body={body} />;
  }
  return <span>{body.type}</span>;
};

export default TypeBody;
