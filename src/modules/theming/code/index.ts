import { Theme, Color, Space } from "../types";

export const theme: Theme = {
  colors: {
    [Color.FOCUS]: "#e6ee9c",
    [Color.PRIMARY]: "#080609",
    [Color.PRIMARY_DARK]: "#030303",
    [Color.PRIMARY_LIGHT]: "#110D12",
    [Color.SECONDARY]: "#e6ee9c",
    [Color.SECONDARY_DARK]: "#ffffce",
    [Color.SECONDARY_LIGHT]: "#b3bc6d",
    [Color.TEXT_PRIMARY]: "#ECE1F4",
    [Color.TEXT_SECONDARY]: "#000000",
    [Color.DANGER]: "#d65d5d",
    [Color.PAGE_BACKGROUND]: "#080609",
    [Color.HEADER_BACKGROUND]: "#161017",
    [Color.NAVIGATION_COLOR]: "#ECE1F4",
    [Color.NAVIGATION_BORDER]: "#252526",
    [Color.NAVIGATION_HOVER]: "#110D12",
    [Color.NAVIGATION_ACTIVE_BORDER]: "#9D89E2",
    [Color.LIST_PATH_BACKGROUND]: "#080609",
    [Color.LIST_PATH_FOREGROUND]: "rgba(224, 206, 237, 0.8)",
    [Color.LIST_PATH_HOVER_FOREGROUND]: "#f5eff9",
    [Color.INDENT_FOREGROUND]: "rgb(97, 78, 110)",
    [Color.BRACKET_FOREGROUND]: "#e0ceed",
    [Color.BUTTON_BACKGROUND]: "#080609",
    [Color.BUTTON_FOREGROUND]: "rgba(224,206,237,0.8)",
    [Color.BUTTON_HOVER_FOREGROUND]: "#f5eff9",
    [Color.BUTTON_HOVER_BACKGROUND]: "#100e12",
    [Color.BUTTON_ACTIVE_FOREGROUND]: "#f5eff9",
    [Color.BUTTON_BORDER]: "#211d26",
    [Color.TEXT_RESERVED]: "#b657ff",
    [Color.TEXT_PARAM]: "#f7b83d",
    [Color.TEXT_PARAM_UNSET]: "#cf433e",
    [Color.TEXT_PARAM_HOVER]: "#e0ceed",
    // [Color.TEXT_NAME]: "#f5b0ef",
    [Color.TEXT_NAME]: "#ECE1F4",
    [Color.TEXT_NAME_HOVER]: "#e0ceed",
    [Color.TEXT_NAME_UNSET]: "#cf433e",
    [Color.TEXT_TYPE_NAME]: "#a29dfa",
    [Color.INPUT_BACKGROUND]: "#000000",
    [Color.INPUT_FOREGROUND]: "rgb(224, 206, 237)",
    [Color.INPUT_BORDER]: "rgb(46, 40, 52)",
    [Color.DROPDOWN_BACKGROUND]: "#000000",
    [Color.DROPDOWN_FOREGROUND]: "#FFFFFF",
    [Color.DROPDOWN_HOVER]: "rgb(182, 87, 255)",
    [Color.DROPDOWN_HOVER_FOREGROUND]: "#000000",
    [Color.DROPDOWN_AUTHOR]: "#e0ceed",
    [Color.DROPDOWN_HOVER_AUTHOR]: "#e0ceed",
    [Color.DROPDOWN_PARAMS]: "#e0ceed",
    [Color.DROPDOWN_SEPARATOR]: "rgb(28, 25, 32)",
    [Color.DROPDOWN_BORDER]: "rgb(28, 25, 32)",
    [Color.SLIDER]: "rgba(59, 52, 66, 0.67)",
    [Color.SLIDER_HOVER]: "rgba(162, 157, 250, 0.33)",
    [Color.CARD_BORDER]: "rgb(28, 25, 32)",
    [Color.CARD_BACKGROUND]: "#080609",
    [Color.SIDEBAR_BACKGROUND]: "rgb(21, 18, 23)",
    [Color.PLACEHOLDER_OUTLINE]: "rgba(224, 206, 237, 0.15)",
    [Color.PLACEHOLDER_TEXT]: "rgba(224, 206, 237, 0.5)",
    [Color.ASSET_HEADER_BACKGROUND]: "rgb(16, 14, 18)",
    [Color.COLLAPSE_CONTENT_BACKGROUND]: "rgb(21, 18, 23)",
    [Color.COLLAPSE_HEADER_BACKGROUND]: "rgb(28, 25, 32)",
  },
  space: {
    [Space.TINY]: "2px",
    [Space.SMALL]: "4px",
    [Space.MEDIUM]: "8px",
    [Space.LARGE]: "16px",
    [Space.HUGE]: "32px",
  },

  inputWidth: "160px",
};
