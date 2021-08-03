import SearchSelect from "components/blocks/search-select/search-select";
import React, { KeyboardEvent, useCallback } from "react";
import { TypePureNameBody } from "types/descriptors";

type OwnProps = {
  item: TypePureNameBody;
};
const fetch = async (): Promise<Array<TypePureNameBody>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: {
            name: "Foo",
            owner: "System",
          },
          type: "pure-name",
        },
        {
          name: {
            name: "Bar",
            owner: "System",
          },
          type: "pure-name",
        },
      ]);
    }, 2000);
  });
};

const TypesSelect: React.FC<OwnProps> = ({ item }): React.ReactElement => {
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
        <span
          onKeyDown={onKeyDown}
          role="button"
          tabIndex={0}
          onClick={() => onExpand()}
        >
          {data.name.name}
        </span>
      );
    },
    []
  );
  const onChange = useCallback((newItem: TypePureNameBody) => {
    console.log(newItem);
  }, []);
  return (
    <SearchSelect
      currentItem={item}
      valueGetter={valueGetter}
      fetch={fetch}
      nameGetter={nameGetter}
      renderRow={renderRow}
      renderTitle={renderTitle}
      onChange={onChange}
    />
  );
};

export default TypesSelect;
