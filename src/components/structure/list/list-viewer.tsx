import React, { useCallback, useMemo, useState } from "react";
import { ListPath } from "../path/path";
import { PinProvider } from "../pin-context";

export const ListViewer: React.FC = ({ children }) => {
  const [statePinnedPath, setStatePinnedPath] = useState<Array<string>>([]);
  const handleChangePath = useCallback(
    (newPath: Array<string>) => {
      setStatePinnedPath(newPath);
    },
    [setStatePinnedPath]
  );

  const pinContextValue = useMemo(
    () => ({
      onPinPath: (newPath: Array<string>) => setStatePinnedPath(newPath),
      pinnedPath: statePinnedPath,
    }),
    [setStatePinnedPath, statePinnedPath]
  );

  return (
    <>
      <ListPath path={statePinnedPath} onChangePath={handleChangePath} />
      <PinProvider value={pinContextValue}>{children}</PinProvider>
    </>
  );
};
