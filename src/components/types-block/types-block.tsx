import React, { useCallback, useMemo } from "react";
import ListBlock from "components/blocks/list-block";
import TypeRow from "components/types-block/type-row";
import { PureTypeDescriptor } from "types/descriptors";
import { Id } from "types/common";

type OwnProps = {
  descriptors: Array<PureTypeDescriptor>;
  onChange: (id: Id, newDescriptor: PureTypeDescriptor) => void;
  onDelete: (id: Id) => void;
  onAdd: () => void;
};

const TypesBlock: React.FC<OwnProps> = ({
  descriptors,
  onChange,
  onDelete,
  onAdd,
}) => {
  const handleChangeDescriptor = useMemo(
    () => (newDescriptor: PureTypeDescriptor) => {
      onChange(newDescriptor.name.id, newDescriptor);
    },
    [onChange]
  );
  const row = useCallback(
    (item: PureTypeDescriptor) => (
      <TypeRow
        descriptor={item}
        onChange={(newDescriptor) => handleChangeDescriptor(newDescriptor)}
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
      onAdd={onAdd}
      getKey={(descriptor) => descriptor.name.id}
    />
  );
};

export default TypesBlock;
