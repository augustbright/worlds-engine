import { ThemeProps } from "styled-components";
import { Theme } from "./types";

type ThemePropGetter = (theme: Theme) => string;
/**
 * fromThemeProp(theme => theme.space.h)
 * (props: ThemeProps<Theme>) => props.theme.space.h
 */
export const fromThemeProp =
  (getter: ThemePropGetter) => (props: ThemeProps<Theme>) =>
    getter(props.theme);
