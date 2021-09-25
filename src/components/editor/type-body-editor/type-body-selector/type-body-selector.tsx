// import { Selector } from "components/common/selector";
import { Selector } from "components/common/selector";
import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Body, TypeBody } from "types/descriptors";
import { RefName } from "components/editor/ref-name";
import { useTypesSelect, Item } from "./hooks";
import { Reserved } from "../../word/reserved";

type Props = {
  body: TypeBody;
  onSelect: (newBody: TypeBody) => void;
};

const View = styled(Reserved)`
  cursor: pointer;
  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
  }
`;

export const TypeBodySelector: React.FC<Props> = ({ body, onSelect }) => {
  const [active, setActive] = useState(false);
  const handleClickSelector = useCallback(() => {
    setActive(true);
  }, [setActive]);
  const handleSelect = useCallback(
    (item: Item) => {
      setActive(false);
      onSelect(item.body);
    },
    [setActive, onSelect]
  );
  const { fetch, render, handleKeyDown } = useTypesSelect({
    onSelect: handleSelect,
  });
  const handleDeactivate = useCallback(() => {
    setActive(false);
  }, []);

  const text = useMemo(() => {
    if (!body) return "any";
    if (body.type === Body.MAP) return "map";
    if (body.type === Body.PARAM) return "param";
    if (body.type === Body.SELECTOR) return "selector";
    if (body.type === Body.REF) return <RefName refId={body.ref} />;
    return "[usupported]";
  }, [body]);

  return (
    <Selector
      active={active}
      fetch={fetch}
      renderItem={render}
      defaultText=""
      onDeactivate={handleDeactivate}
      onKeyDown={handleKeyDown}
    >
      <View onClick={handleClickSelector}>{text}</View>
    </Selector>
  );
};
