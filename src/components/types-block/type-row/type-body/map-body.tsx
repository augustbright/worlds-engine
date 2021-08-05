import MapBlock from "components/blocks/map-block";
import React, { useCallback, useMemo } from "react";
import { TypePureBody, TypePureMapBody } from "types/descriptors";
import TypeBody from "./type-body";

type OwnProps = {
  body: TypePureMapBody;
  onChange: (newBody: TypePureMapBody) => void;
};

const MapBody: React.FC<OwnProps> = ({
  body,
  onChange,
}): React.ReactElement => {
  const handleOnChange = useMemo(
    () => (key: string, newBody: TypePureBody) => {
      onChange({
        ...body,
        map: {
          ...body.map,
          [key]: newBody,
        },
      });
    },
    [body, onChange]
  );
  const renderValue = useCallback(
    (value, key) => (
      <TypeBody
        body={value}
        onChange={(newBody) => handleOnChange(key, newBody)}
      />
    ),
    [handleOnChange]
  );

  return <MapBlock data={body.map} renderValue={renderValue} />;
};

export const create = (): TypePureMapBody => ({
  type: "pure-map",
  map: {},
});

export default MapBody;
