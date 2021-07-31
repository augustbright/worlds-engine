import React, { useCallback } from "react";
import { Item } from "components/blocks/field-select/common";
import FieldSelect from "components/blocks/field-select";

type OwnProps = {
  type: string;
  onChange: (newType: string) => void;
};

export const types: Array<Item> = [
  {
    value: "pure-name",
    title: "type",
  },
  {
    value: "pure-map",
    title: "map",
  },
  {
    value: "selector",
    title: "selectir",
  },
  {
    value: "param",
    title: "param",
  },
];

const TypeSelect: React.FC<OwnProps> = ({ type, onChange }) => {
  const onSelectChange = useCallback(
    (newValue) => {
      onChange(newValue);
    },
    [onChange]
  );
  return <FieldSelect items={types} value={type} onChange={onSelectChange} />;
};

export default TypeSelect;
