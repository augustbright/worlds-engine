import React from "react";
import ListBlock from "components/blocks/list-block";
import TypeRow from "components/types-block/type-row";
import { PureTypeDescriptor } from "types/descriptors";

type OwnProps = {
  descriptors: Array<PureTypeDescriptor>;
};

const TypesBlock: React.FC<OwnProps> = ({ descriptors }) => {
  return (
    <ListBlock
      bracketsType="CURLY"
      data={descriptors}
      row={(item) => <TypeRow descriptor={item} />}
      getKey={(descriptor) => descriptor.name}
    />
  );
};

export default TypesBlock;
