import MapBlock from "components/blocks/map-block";
import React from "react";
import { TypeSelectorBody } from "types/descriptors";
import TypeBody from "../type-body";

type OwnProps = {
  body: TypeSelectorBody;
};

const SelectorBody: React.FC<OwnProps> = ({ body }): React.ReactElement => {
  return (
    <>
      <MapBlock
        bracketsType="ROUND"
        data={body.params}
        renderValue={(value) => <TypeBody body={value} />}
      />
      <span>{"=>"}</span>
      <TypeBody body={body.returns} />
    </>
  );
};

export default SelectorBody;
