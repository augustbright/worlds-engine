// import { Selector } from "components/common/selector";
import { Selector } from "components/common/selector";
import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useTypesSelect, Item } from "./hooks";
import { Reserved } from "./reserved";

type Props = {
  text: string;
};

const View = styled(Reserved)`
  cursor: pointer;
  &:hover {
    color: ${fromThemeProp((t) => t.colors[Color.BUTTON_HOVER_FOREGROUND])};
  }
`;

export const TypeBodySelector: React.FC<Props> = ({ text }) => {
  const [active, setActive] = useState(false);
  const handleClickSelector = useCallback(() => {
    setActive(true);
  }, [setActive]);
  const handleSelect = useCallback(
    (item: Item) => {
      alert(JSON.stringify(item, null, 3));
      setActive(false);
    },
    [setActive]
  );
  const { fetch, render } = useTypesSelect({
    onSelect: handleSelect,
  });
  const handleDeactivate = useCallback(() => {
    setActive(false);
  }, []);

  return (
    <Selector
      active={active}
      fetch={fetch}
      renderItem={render}
      defaultText={text}
      onDeactivate={handleDeactivate}
    >
      <View onClick={handleClickSelector}>{text}</View>
    </Selector>
  );
};
