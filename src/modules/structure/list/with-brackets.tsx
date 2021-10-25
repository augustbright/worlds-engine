import { Color } from "modules/theming";
import { fromThemeProp } from "modules/theming/utils";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import React, { useCallback } from "react";
import styled from "styled-components";
import { IconButton } from "modules/common/components/icon-button";
import { PatternContainer } from "../item/pattern-container";
import { ListItem } from "./list";

export enum Bracket {
  CURLY,
  ANGLE,
  SQUARE,
  ROUND,
}

type BracketDescriptor = {
  start: string;
  end: string;
};

const brackets: Record<Bracket, BracketDescriptor> = {
  [Bracket.ANGLE]: {
    start: "<",
    end: ">",
  },
  [Bracket.CURLY]: {
    start: "{",
    end: "}",
  },
  [Bracket.ROUND]: {
    start: "(",
    end: ")",
  },
  [Bracket.SQUARE]: {
    start: "[",
    end: "]",
  },
};

const BracketContainer = styled(PatternContainer)`
  color: ${fromThemeProp((t) => t.colors[Color.BRACKET_FOREGROUND])};
`;

type ToggleProps = {
  onToggle?: (collapse: boolean) => void;
  collapsed?: boolean;
};

const ToggleContainer: React.FC<ToggleProps> = ({ onToggle, collapsed }) => {
  const handleClick = useCallback(() => {
    if (onToggle) {
      onToggle(!collapsed);
    }
  }, [onToggle, collapsed]);

  return (
    <IconButton
      size="xs"
      icon={collapsed ? faChevronRight : faChevronDown}
      onClick={handleClick}
    />
  );
};

export const withBrackets = (
  list: Array<ListItem>,
  bracket: Bracket,
  { onToggle = undefined, collapsed = false }: ToggleProps | undefined = {}
): Array<ListItem> => [
  {
    id: "start",
    content: (
      <>
        {onToggle ? (
          <ToggleContainer onToggle={onToggle} collapsed={collapsed} />
        ) : null}
        <BracketContainer>{brackets[bracket].start}</BracketContainer>
      </>
    ),
  },
  ...(collapsed
    ? [
        {
          id: "collapsed",
          content: <>...</>,
        },
      ]
    : list),
  {
    id: "end",
    content: <BracketContainer>{brackets[bracket].end}</BracketContainer>,
  },
];
