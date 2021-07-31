import React, { useCallback } from "react";
import { TypePureBody } from "types/descriptors";
import NameBody from "./name-body";
import MapBody from "./map-body";
import SelectorBody from "./selector-body";
import ParamBody from "./param-body";
import TypeSelect from "./type-select";

type OwnProps = {
  body: TypePureBody;
};

const TypeBody: React.FC<OwnProps> = ({ body }) => {
  const onChangeBodyType = useCallback((value) => {
    console.log(value);
  }, []);

  let bodyElement = null;
  if (body.type === "pure-name") {
    bodyElement = <NameBody body={body} />;
  }
  if (body.type === "pure-map") {
    bodyElement = <MapBody body={body} />;
  }
  if (body.type === "selector") {
    bodyElement = <SelectorBody body={body} />;
  }
  if (body.type === "param") {
    bodyElement = <ParamBody body={body} />;
  }

  return (
    <>
      <TypeSelect type={body.type} onChange={onChangeBodyType} />
      {bodyElement}
    </>
  );

  return null;
};

export default TypeBody;
