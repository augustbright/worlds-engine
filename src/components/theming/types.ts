export enum Color {
  PRIMARY = "cP",
  PRIMARY_LIGHT = "cPL",
  PRIMARY_DARK = "cPD",

  SECONDARY = "cS",
  SECONDARY_LIGHT = "cSL",
  SECONDARY_DARK = "cSD",

  TEXT_PRIMARY = "cTP",
  TEXT_SECONDARY = "cTS",

  FOCUS = "cF",
  DANGER = "cD",
}

export enum Space {
  TINY = "t",
  SMALL = "s",
  MEDIUM = "m",
  LARGE = "l",
  HUGE = "h",
}

export type Theme = {
  colors: Record<Color, string>;
  space: Record<Space, string>;

  inputWidth: string;
};
