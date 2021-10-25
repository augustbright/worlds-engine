// TODO get author name

import { Color, Space } from "modules/theming/types";
import { fromThemeProp } from "modules/theming/utils";
import { getBodyParams } from "func/types";
import React, { useMemo } from "react";
import styled from "styled-components";
import { TypeBody } from "types/descriptors";

type Props = {
  item: Item;
  hover?: boolean;
};

const ItemContainer = styled.div<{ hover?: boolean }>`
  padding: ${fromThemeProp((t) => t.space[Space.SMALL])}
    ${fromThemeProp((t) => t.space[Space.LARGE])};
  color: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_FOREGROUND])};
  cursor: pointer;
  background: ${(props) =>
    props.hover
      ? fromThemeProp((t) => t.colors[Color.DROPDOWN_HOVER])(props)
      : "transparent"};

  &:hover {
    background: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_HOVER])};
    color: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_HOVER_FOREGROUND])};
  }
`;

const NameContainer = styled.div`
  white-space: nowrap;
`;

const ParamsContainer = styled.div`
  display: inline;
  font-size: 13px;
  color: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_PARAMS])};
`;

const AuthorContainer = styled.div`
  white-space: nowrap;
  font-size: 13px;
  color: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_AUTHOR])};
`;

export type Item = {
  id: string;
  text: string;
  body: TypeBody;
};

export const TypeItem: React.FC<Props> = ({ item, hover = false }) => {
  const { paramsText, author } = useMemo(() => {
    const params = getBodyParams(item.body);
    return {
      paramsText: params.length ? `<${params.join(", ")}>` : "",
      author: "author",
    };
  }, [item]);

  return (
    <ItemContainer hover={hover}>
      <NameContainer>
        {item.text}
        <ParamsContainer> {paramsText}</ParamsContainer>{" "}
      </NameContainer>
      <AuthorContainer>{author}</AuthorContainer>
    </ItemContainer>
  );
};
