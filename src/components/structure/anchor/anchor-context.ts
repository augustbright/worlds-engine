import { noop } from "lodash";
import React from "react";

type AnchorContextData = {
  pinnedPath: Array<string>;
  onPinPath: (newPath: Array<string>) => void;
  display: (content: React.ReactNode) => void;
};

export const AnchorContext = React.createContext<AnchorContextData>({
  pinnedPath: [],
  onPinPath: noop,
  display: noop,
});

export const AnchorProvider = AnchorContext.Provider;
