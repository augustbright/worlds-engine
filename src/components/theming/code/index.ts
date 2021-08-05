import { Theme, Color, Space } from "../types";

export const theme: Theme = {
  colors: {
    [Color.FOCUS]: "#00d200",
    [Color.PRIMARY]: "#263238",
    [Color.PRIMARY_DARK]: "#000a12",
    [Color.PRIMARY_LIGHT]: "#4f5b62",
    [Color.SECONDARY]: "#e6ee9c",
    [Color.SECONDARY_DARK]: "#ffffce",
    [Color.SECONDARY_LIGHT]: "#b3bc6d",
    [Color.TEXT_PRIMARY]: "#ffffff",
    [Color.TEXT_SECONDARY]: "#000000",
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
