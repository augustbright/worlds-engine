import SearchSelect from "components/blocks/search-select/search-select";
import { FocusableSpan } from "components/styled";
import React, { KeyboardEvent, useCallback } from "react";
import { TypePureNameBody } from "types/descriptors";
import { get } from "../../server/types";

type OwnProps = {
  item: TypePureNameBody;
  onChange: (newBody: TypePureNameBody) => void;
};

const fetch = async () => {
  return get();
};

const TypesSelect: React.FC<OwnProps> = ({
  item,
  onChange,
}): React.ReactElement => {
  const valueGetter = useCallback((from: TypePureNameBody) => {
    return [from.name.owner, from.name.name].join("-");
  }, []);
  const nameGetter = useCallback((from: TypePureNameBody) => {
    return from.name.name;
  }, []);
  const renderRow = useCallback(
    (data: TypePureNameBody, focused: boolean): React.ReactElement => {
      return (
        <span>
          {focused ? <span>{"> "}</span> : null}
          {data.name.name}
        </span>
      );
    },
    []
  );
  const renderTitle = useCallback(
    (data: TypePureNameBody, onExpand: () => void): React.ReactElement => {
      const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          onExpand();
        }
      };
      return (
        <FocusableSpan
          onKeyDown={onKeyDown}
          role="button"
          tabIndex={0}
          onClick={() => onExpand()}
        >
          {data.name.name || "<EMPTY>"}
        </FocusableSpan>
      );
    },
    []
  );
  const handleChange = useCallback(
    (newItem: TypePureNameBody) => {
      onChange(newItem);
    },
    [onChange]
  );

  return (
    <SearchSelect
      currentItem={item}
      valueGetter={valueGetter}
      fetch={fetch}
      nameGetter={nameGetter}
      renderRow={renderRow}
      renderTitle={renderTitle}
      onChange={handleChange}
    />
  );
};

export default TypesSelect;
