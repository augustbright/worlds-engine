import React, { useCallback, useMemo, useState } from "react";
import { ListPath } from "./path";
import { PathProvider } from "./path-context";

export const ListViewer: React.FC = ({ children }) => {
  const [statePinnedPath, setStatePinnedPath] = useState<Array<string>>([]);
  const handleChangePath = useCallback(
    (newPath: Array<string>) => {
      setStatePinnedPath(newPath);
    },
    [setStatePinnedPath]
  );

  const nextPathContext = useMemo(
    () => ({
      path: [],
      onPinPath: (newPath: Array<string>) => setStatePinnedPath(newPath),
      pinnedPath: statePinnedPath,
    }),
    [setStatePinnedPath, statePinnedPath]
  );

  return (
    <>
      <ListPath path={statePinnedPath} onChangePath={handleChangePath} />
      <PathProvider value={nextPathContext}>{children}</PathProvider>
    </>
  );
};
