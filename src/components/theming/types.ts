export enum Color {
  PRIMARY,
  PRIMARY_LIGHT,
  PRIMARY_DARK,

  SECONDARY,
  SECONDARY_LIGHT,
  SECONDARY_DARK,

  TEXT_PRIMARY,
  TEXT_SECONDARY,

  FOCUS,
  DANGER,

  PAGE_BACKGROUND,

  HEADER_BACKGROUND,
  NAVIGATION_COLOR,
  NAVIGATION_BORDER,
  NAVIGATION_HOVER,
  NAVIGATION_ACTIVE_BORDER,

  LIST_PATH_BACKGROUND,
  LIST_PATH_FOREGROUND,
  LIST_PATH_HOVER_FOREGROUND,
}

export enum Space {
  TINY,
  SMALL,
  MEDIUM,
  LARGE,
  HUGE,
}

export type Theme = {
  colors: Record<Color, string>;
  space: Record<Space, string>;

  inputWidth: string;
};
