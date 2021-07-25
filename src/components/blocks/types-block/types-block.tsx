import React from "react";
import ListBlock from "components/blocks/list-block";
import TypeRow from "components/blocks/type-row";
import { PureTypeDescriptor } from "types/descriptors";

type OwnProps = {
  descriptors: Array<PureTypeDescriptor>;
};

const TypesBlock: React.FC<OwnProps> = ({ descriptors }) => {
  return (
    <ListBlock
      data={descriptors}
      row={(item) => <TypeRow descriptor={item} />}
      getKey={(descriptor) => descriptor.name}
    />
  );
};

export default TypesBlock;
