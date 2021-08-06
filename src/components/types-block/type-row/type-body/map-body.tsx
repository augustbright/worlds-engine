import MapBlock from "components/blocks/map-block";
import React, { useCallback, useMemo } from "react";
import { TypePureBody, TypePureMapBody } from "types/descriptors";
import TypeBody from "./type-body";

type OwnProps = {
  body: TypePureMapBody;
  onChange: (newBody: TypePureMapBody) => void;
};

export const create = (): TypePureMapBody => ({
  type: "pure-map",
  map: {},
});

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
  const handleMapChange = useCallback(
    (newMap: Record<string, TypePureBody>) => {
      onChange({
        ...body,
        map: newMap,
      });
    },
    [onChange, body]
  );

  const handleMapAdd = useMemo(() => {
    if ("" in body.map) {
      return undefined;
    }
    return () => {
      onChange({
        ...body,
        map: {
          ...body.map,
          "": {} as TypePureBody,
        },
      });
    };
  }, [body, onChange]);

  return (
    <MapBlock
      data={body.map}
      renderValue={renderValue}
      onChange={handleMapChange}
      onAdd={handleMapAdd}
    />
  );
};

export default MapBody;
