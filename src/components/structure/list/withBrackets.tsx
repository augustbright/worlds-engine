import { Color } from "components/theming";
import { fromThemeProp } from "components/theming/utils";
import React from "react";
import styled from "styled-components";
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

export const withBrackets = (
  list: Array<ListItem>,
  bracket: Bracket
): Array<ListItem> => [
  {
    id: "start",
    content: <BracketContainer>{brackets[bracket].start}</BracketContainer>,
  },
  ...list,
  {
    id: "end",
    content: <BracketContainer>{brackets[bracket].end}</BracketContainer>,
  },
];
