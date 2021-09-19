import { noop } from "lodash";
import React, { useContext } from "react";

type PinContextData = {
  pinnedPath: Array<string>;
  onPinPath: (newPath: Array<string>) => void;
};

const PinContext = React.createContext<PinContextData>({
  pinnedPath: [],
  onPinPath: noop,
});

export const PathProvider = PinContext.Provider;
export const usePathContext = () => useContext(PinContext);
