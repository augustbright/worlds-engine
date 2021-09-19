import { noop } from "lodash";
import React, { useContext } from "react";
import { usePathContext } from "./path/path-context";

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
export const useNavigate = () => {
  const { pinnedPath } = usePinContext();
  const { path } = usePathContext();
  if (pinnedPath.length === 0) return null;

  const inPath = path.every(
    (_item, index) => path[index] === pinnedPath[index]
  );
  if (!inPath) return null;

  if (path.length === pinnedPath.length) return null;

  return pinnedPath[path.length];
};
