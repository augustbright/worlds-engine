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

export const PinProvider = PinContext.Provider;
export const usePinContext = () => useContext(PinContext);
