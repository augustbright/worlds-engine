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

  INDENT_FOREGROUND,
  BRACKET_FOREGROUND,

  BUTTON_FOREGROUND,
  BUTTON_HOVER_FOREGROUND,
  BUTTON_ACTIVE_FOREGROUND,
  BUTTON_BACKGROUND,
  BUTTON_BORDER,

  TEXT_RESERVED,

  INPUT_BACKGROUND,
  INPUT_FOREGROUND,
  INPUT_BORDER,

  DROPDOWN_BACKGROUND,
  DROPDOWN_FOREGROUND,
  DROPDOWN_HOVER,
  DROPDOWN_HOVER_FOREGROUND,
  DROPDOWN_AUTHOR,
  DROPDOWN_HOVER_AUTHOR,
  DROPDOWN_PARAMS,
  SLIDER,
  SLIDER_HOVER,
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
