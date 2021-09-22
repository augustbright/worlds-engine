import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Dropdown } from "./dropdown";

type Props<T extends unknown> = {
  defaultText: string;
  fetch: (query: string) => Promise<Array<T>>;
  onChange: (newValue: T | null) => void;
  render: (item: T) => React.ReactNode;
};

const StyledInput = styled.input`
  padding: 0 4px;
  height: 22px;
  color: ${fromThemeProp((t) => t.colors[Color.INPUT_FOREGROUND])};
  background: ${fromThemeProp((t) => t.colors[Color.INPUT_BACKGROUND])};
  border: solid 1px ${fromThemeProp((t) => t.colors[Color.INPUT_BORDER])};
`;

export const Selector = <T extends unknown>({
  defaultText,
  onChange,
  render,
  fetch,
}: Props<T>) => {
  const [text, setText] = useState(defaultText);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    [setText]
  );
  const [items, setItems] = useState<Array<T>>([]);
  useEffect(() => {
    fetch(text).then((fetchedItems) => {
      setItems(fetchedItems);
    });
  }, [text, fetch, setItems]);
  const dropdownContent = useMemo(
    () => <>{items.map((item) => render(item))}</>,
    [items, render]
  );
  return (
    <>
      <Dropdown visible content={dropdownContent}>
        <StyledInput value={text} onChange={handleChange} />
      </Dropdown>
    </>
  );
};
