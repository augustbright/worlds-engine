import { ItemContainer } from "modules/editor/type-body-editor/type-body-selector/item-container";
import { SeparatorItem } from "modules/editor/type-body-editor/type-body-selector/separator-item";
import { Name } from "modules/editor/word/name";
import { Color } from "modules/theming";
import { joinListsWithSeparator } from "func/common";
import { useClickOutside } from "hook/common";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQuery } from "react-query";
import { Clickable } from "../common/components/clickable";
import { Dropdown } from "../common/components/dropdown";
import { StyledInput } from "../common/components/input";

class ItemSeparator {}
type FetchedItem = { id: string; text: string };
type Fetch<T extends FetchedItem> = (query: string) => Promise<Array<Array<T>>>;

type Props<T extends FetchedItem> = {
  fetch: Fetch<T>;
  fetchKey: string;
  renderItem: (item: T, hover: boolean) => React.ReactNode;
  onSelect: (item: T) => void;
  color?: Color;
};

const useControlledText = () => {
  const [text, setText] = useState("");
  const handleChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    [setText]
  );

  return { text, setText, handleChangeText };
};

const useFetchItems = <T extends FetchedItem>(
  fetch: Fetch<T>,
  query: string,
  fetchKey: string
) => {
  const { data } = useQuery([fetchKey, query], () => fetch(query));
  const items = useMemo(
    () => (data ? joinListsWithSeparator(new ItemSeparator(), ...data) : []),
    [data]
  );
  return { items };
};

const useSelect = <T extends FetchedItem>({
  fetch,
  fetchKey,
  renderItem,
  onSelect,
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);
  const { text, setText, handleChangeText } = useControlledText();
  const { items } = useFetchItems<T>(fetch, text, fetchKey);

  const handleClickView = useCallback(() => {
    setActive(true);
    setText("");
  }, [setActive, setText]);
  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
    }
  }, [active]);

  const handleClickOutside = useCallback(() => {
    setActive(false);
  }, [setActive]);
  useClickOutside(dropdownRef, handleClickOutside);

  const handleClickItem = useCallback(
    (item: T) => {
      onSelect(item);
      setActive(false);
    },
    [onSelect]
  );

  const [selected, setSelected] = useState<string | null>(null);
  const getSelectedItem = useCallback(() => {
    return items.find(
      (item) => !(item instanceof ItemSeparator) && item.id === selected
    ) as T;
  }, [items, selected]);

  const getSelectedIndex = useCallback(() => {
    return items.findIndex(
      (item) => !(item instanceof ItemSeparator) && item.id === selected
    );
  }, [items, selected]);

  const getNextItem = useCallback(
    (offset: 1 | -1): string | null => {
      if (items.length === 0) return null;

      const selectedIndex = getSelectedIndex();
      if (selected === null || selectedIndex === -1) {
        if (offset === 1) return (items[0] as T).id;
        return (items[items.length - 1] as T).id;
      }

      if (offset === 1) {
        if (selectedIndex === items.length - 1) return (items[0] as T).id;
        const nextItem = items[selectedIndex + 1];
        if (nextItem instanceof ItemSeparator) {
          return (items[selectedIndex + 2] as T).id;
        }
        return nextItem.id;
      }
      if (selectedIndex === 0) return (items[items.length - 1] as T).id;
      const prevItem = items[selectedIndex - 1];
      if (prevItem instanceof ItemSeparator) {
        return (items[selectedIndex - 2] as T).id;
      }
      return prevItem.id;
    },
    [selected, items, getSelectedIndex]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp") {
        setSelected(getNextItem(-1));
      }
      if (event.key === "ArrowDown") {
        setSelected(getNextItem(1));
      }
      if (event.key === "Enter") {
        const selectedItem = getSelectedItem();
        if (selectedItem) {
          onSelect(selectedItem);
          setActive(false);
        }
      }
      if (event.key === "Escape") {
        setActive(false);
      }
    },
    [getNextItem, setSelected, onSelect, getSelectedItem]
  );

  const dropdownContent = useMemo(
    () => (
      <>
        {items.map((item, i) => (
          <ItemContainer
            key={item instanceof ItemSeparator ? `separator-${i}` : item.id}
            ref={
              !(item instanceof ItemSeparator) && item.id === selected
                ? selectedRef
                : undefined
            }
            onClick={
              item instanceof ItemSeparator
                ? undefined
                : () => handleClickItem(item)
            }
          >
            {item instanceof ItemSeparator ? (
              <SeparatorItem />
            ) : (
              renderItem(item, item.id === selected)
            )}
          </ItemContainer>
        ))}
      </>
    ),
    [items, renderItem, handleClickItem, selected]
  );

  const currentSelectedRef = selectedRef.current;

  useEffect(() => {
    if (!selectedRef.current) return;
    if (!contentRef.current) return;

    const { offsetTop: itemOffsetTop } = selectedRef.current;
    const { height: itemHeight } = selectedRef.current.getBoundingClientRect();
    const { scrollTop } = contentRef.current;
    const { height: contentHeight } =
      contentRef.current.getBoundingClientRect();

    if (itemOffsetTop > scrollTop + contentHeight - itemHeight) {
      contentRef.current.scrollTop = itemOffsetTop - contentHeight + itemHeight;
    }
    if (itemOffsetTop < scrollTop) {
      contentRef.current.scrollTop = itemOffsetTop;
    }
  }, [currentSelectedRef]);

  return {
    inputRef,
    dropdownRef,
    contentRef,
    active,
    text,
    handleChangeText,
    dropdownContent,
    handleClickView,
    handleKeyDown,
  };
};

export const Selector = <T extends FetchedItem>(
  props: React.PropsWithChildren<Props<T>>
) => {
  const { children, color } = props;
  const {
    inputRef,
    dropdownRef,
    contentRef,
    active,
    dropdownContent,
    text,
    handleChangeText,
    handleClickView,
    handleKeyDown,
  } = useSelect(props);

  const activeContent = (
    <>
      <Dropdown
        ref={dropdownRef}
        visible
        content={dropdownContent}
        contentRef={contentRef}
      >
        <StyledInput
          ref={inputRef}
          value={text}
          onChange={handleChangeText}
          onKeyDown={handleKeyDown}
        />
      </Dropdown>
    </>
  );

  const viewContent = (
    <Clickable onClick={handleClickView}>
      <Name color={color}>{children}</Name>
    </Clickable>
  );

  return active ? activeContent : viewContent;
};
