import React, { useCallback, useMemo } from "react";
import ListBlock from "components/blocks/list-block";
import TypeRow from "components/types-block/type-row";
import { PureTypeDescriptor } from "types/descriptors";
import { Id } from "types/common";

type OwnProps = {
  descriptors: Array<PureTypeDescriptor>;
  onChange: (newDescriptors: Array<PureTypeDescriptor>) => void;
  onDelete: (id: Id) => void;
};

const TypesBlock: React.FC<OwnProps> = ({
  descriptors,
  onChange,
  onDelete,
}) => {
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
  const handleDelete = useCallback(
    (idx: number) => {
      onDelete(descriptors[idx].name.id);
    },
    [onDelete, descriptors]
  );

  return (
    <ListBlock
      bracketsType="CURLY"
      data={descriptors}
      row={row}
      onDelete={handleDelete}
      getKey={(descriptor) => descriptor.name.id}
    />
  );
};

export default TypesBlock;
