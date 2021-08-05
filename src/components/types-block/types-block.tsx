import React, { useCallback, useMemo } from "react";
import ListBlock from "components/blocks/list-block";
import TypeRow from "components/types-block/type-row";
import { PureTypeDescriptor } from "types/descriptors";

type OwnProps = {
  descriptors: Array<PureTypeDescriptor>;
  onChange: (newDescriptors: Array<PureTypeDescriptor>) => void;
};

const TypesBlock: React.FC<OwnProps> = ({ descriptors, onChange }) => {
  const handleChangeDescriptor = useMemo(
    () =>
      (idx = 0, newDescriptor: PureTypeDescriptor) => {
        onChange([
          ...descriptors.slice(0, idx),
          newDescriptor,
          ...descriptors.slice(idx + 1),
        ]);
      },
    [onChange, descriptors]
  );
  const row = useCallback(
    (item: PureTypeDescriptor, idx?: number) => (
      <TypeRow
        descriptor={item}
        onChange={(newDescriptor) => handleChangeDescriptor(idx, newDescriptor)}
      />
    ),
    [handleChangeDescriptor]
  );
  return (
    <ListBlock
      bracketsType="CURLY"
      data={descriptors}
      row={row}
      getKey={(descriptor) => descriptor.name}
    />
  );
};

export default TypesBlock;
