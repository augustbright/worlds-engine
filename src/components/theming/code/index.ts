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
