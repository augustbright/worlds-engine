import { useClickOutside } from "hook/common";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dropdown } from "./dropdown";
import { StyledInput } from "./input";

type Props<T> = {
  active: boolean;
  onDeactivate: () => void;

  defaultText: string;
  fetch: (query: string) => Promise<Array<T>>;
  renderItem: (item: T) => React.ReactNode;
};

export const Selector = <T,>({
  children,
  active,
  defaultText,
  renderItem,
  fetch,
  onDeactivate,
}: React.PropsWithChildren<Props<T>>) => {
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
    () => <>{items.map((item) => renderItem(item))}</>,
    [items, renderItem]
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setText(defaultText);
    inputRef.current?.focus();
  }, [active, defaultText]);

  const handleFocus = useCallback(() => {
    inputRef.current?.select();
  }, []);

  const handleClickOutside = useCallback(() => {
    onDeactivate();
  }, [onDeactivate]);

  useClickOutside(dropdownRef, handleClickOutside);

  const activeContent = (
    <>
      <Dropdown ref={dropdownRef} visible content={dropdownContent}>
        <StyledInput
          onFocus={handleFocus}
          ref={inputRef}
          value={text}
          onChange={handleChange}
        />
      </Dropdown>
    </>
  );

  return active ? activeContent : <>{children}</>;
};
