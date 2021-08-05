import React, { useCallback } from "react";
import { TypePureBody } from "types/descriptors";
import NameBody, { create as createNameBody } from "./name-body";
import MapBody, { create as createMapBody } from "./map-body";
import SelectorBody, { create as createSelectorBody } from "./selector-body";
import ParamBody, { create as createParamBody } from "./param-body";
import TypeSelect from "./type-select";

type OwnProps = {
  body: TypePureBody;
  onChange: (newBody: TypePureBody) => void;
};

const TypeBody: React.FC<OwnProps> = ({ body, onChange }) => {
  const onChangeBodyType = useCallback(
    (value) => {
      if (value === body.type) return;
      let newBody: TypePureBody;

      if (value === "pure-name") {
        newBody = createNameBody();
      } else if (value === "pure-map") {
        newBody = createMapBody();
      } else if (value === "selector") {
        newBody = createSelectorBody();
      } else {
        newBody = createParamBody();
      }

      onChange(newBody);
    },
    [body, onChange]
  );

  let bodyElement = null;
  if (body.type === "pure-name") {
    bodyElement = <NameBody body={body} onChange={onChange} />;
  }
  if (body.type === "pure-map") {
    bodyElement = <MapBody body={body} onChange={onChange} />;
  }
  if (body.type === "selector") {
    bodyElement = <SelectorBody body={body} onChange={onChange} />;
  }
  if (body.type === "param") {
    bodyElement = <ParamBody body={body} onChange={onChange} />;
  }

  return (
    <>
      <TypeSelect type={body.type} onChange={onChangeBodyType} />
      <span> </span>
      {bodyElement}
    </>
  );

  return null;
};

export default TypeBody;
