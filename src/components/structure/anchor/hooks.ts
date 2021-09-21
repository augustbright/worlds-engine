import { useContext } from "react";
import { AnchorContext } from "./anchor-context";
import { PathContext } from "./path-context";

export const useAnchorContext = () => useContext(AnchorContext);
export const usePathContext = () => useContext(PathContext);
