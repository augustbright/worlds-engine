import { Color, Space } from "components/theming/types";
import { fromThemeProp } from "components/theming/utils";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

type Props = {
  name: string;
  author: string;
  params: Array<string>;
  onClick: () => void;
};

const ItemContainer = styled.div`
  padding: ${fromThemeProp((t) => t.space[Space.SMALL])}
    ${fromThemeProp((t) => t.space[Space.LARGE])};
  color: ${fromThemeProp((t) => t.colors[Color.DROPDOWN_FOREGROUND])};
  cursor: pointer;

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

export const ExternalTypeItem: React.FC<Props> = ({
  name,
  author,
  params,
  onClick,
}) => {
  const paramsText = useMemo(() => {
    return params.length ? `<${params.join(", ")}>` : "";
  }, [params]);
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return (
    <ItemContainer onClick={handleClick}>
      <NameContainer>
        {name}
        <ParamsContainer> {paramsText}</ParamsContainer>{" "}
      </NameContainer>
      <AuthorContainer>{author}</AuthorContainer>
    </ItemContainer>
  );
};
