import { Color } from "components/theming";
import { Space } from "components/theming/types";
import { fromThemeProp } from "components/theming/utils";
import TypesBlock from "components/types-block";
import React from "react";
import styled from "styled-components";
import { PureTypeDescriptor } from "types/descriptors";

type OwnProps = {
  types: Array<PureTypeDescriptor>;
  onChangeTypes: (newTypes: Array<PureTypeDescriptor>) => void;
};

const Div = styled.div`
  background: ${fromThemeProp((theme) => theme.colors[Color.PRIMARY])};
  color: ${fromThemeProp((theme) => theme.colors[Color.TEXT_PRIMARY])};
  padding: ${fromThemeProp((theme) => theme.space[Space.MEDIUM])};
`;

export default ({ types, onChangeTypes }: OwnProps): React.ReactElement => {
  return (
    <Div>
      <TypesBlock descriptors={types} onChange={onChangeTypes} />
    </Div>
  );
};
