// import { Selector } from "components/common/selector";
import { Selector } from "components/common/selector";
import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import { noop } from "lodash";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useTypesSelect } from "./hooks";
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
  const { fetch, render } = useTypesSelect();
  return active ? (
    <Selector
      defaultText={text}
      fetch={fetch}
      render={render}
      onChange={noop}
    />
  ) : (
    // <Selector defaultText={text} onChange={noop} fetch={} />
    <View onClick={handleClickSelector}>{text}</View>
  );
};
