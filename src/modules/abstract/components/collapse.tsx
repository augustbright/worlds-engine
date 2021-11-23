import { Color } from "modules/theming";
import { fromThemeProp } from "modules/theming/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Space } from "modules/theming/types";
import { Clickable } from "modules/common/components/clickable";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  title: React.ReactNode;
};

const CollapseHeaderContainer = styled(Clickable)`
  padding: 0 ${fromThemeProp((t) => t.space[Space.MEDIUM])};
  display: flex;
  align-items: center;
  height: 22px;
`;

const TitleContainer = styled.div`
  flex: 0 0 auto;
  margin-left: ${fromThemeProp((t) => t.space[Space.MEDIUM])};
`;

const CollapseContainer = styled.div`
  border: solid 1px
    ${fromThemeProp((t) => t.colors[Color.COLLAPSE_CONTENT_BACKGROUND])};
`;

export const Collapse: React.FC<Props> = ({
  children,
  className,
  style,
  title,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleClick = useCallback(() => {
    setCollapsed((v) => !v);
  }, [setCollapsed]);

  return (
    <>
      <CollapseHeaderContainer onClick={handleClick}>
        <FontAwesomeIcon icon={collapsed ? faAngleDown : faAngleUp} />
        <TitleContainer>{title}</TitleContainer>
      </CollapseHeaderContainer>
      {collapsed ? null : (
        <CollapseContainer className={className} style={style}>
          {children}
        </CollapseContainer>
      )}
    </>
  );
};
