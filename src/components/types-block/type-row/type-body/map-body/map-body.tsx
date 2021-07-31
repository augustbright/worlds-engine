import MapBlock from "components/blocks/map-block";
import React from "react";
import { TypePureMapBody } from "types/descriptors";
import TypeBody from "../type-body";

type OwnProps = {
  body: TypePureMapBody;
};

const MapBody: React.FC<OwnProps> = ({ body }): React.ReactElement => {
  return (
    <MapBlock
      data={body.map}
      renderValue={(value) => <TypeBody body={value} />}
    />
  );
};

export default MapBody;
