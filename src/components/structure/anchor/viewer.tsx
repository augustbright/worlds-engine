import React, { useCallback, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { ListPath } from "./path/path";
import { AnchorProvider } from "./anchor-context";

export const AnchorViewer: React.FC = ({ children }) => {
  const [statePinnedPath, setStatePinnedPath] = useState<Array<string>>([]);
  const [displayedContent, setDisplayedContent] =
    useState<React.ReactNode>(null);
  const handleChangePath = useCallback(
    (newPath: Array<string>) => {
      setStatePinnedPath(newPath);
      setDisplayedContent(null);
    },
    [setStatePinnedPath]
  );

  const anchorContextValue = useMemo(
    () => ({
      onPinPath: (newPath: Array<string>) => {
        setStatePinnedPath(newPath);
      },
      display: (content: React.ReactNode) => setDisplayedContent(content),
      pinnedPath: statePinnedPath,
    }),
    [setStatePinnedPath, statePinnedPath]
  );

  const portal = useMemo(() => {
    const detached = document.createElement("div");
    return ReactDOM.createPortal(
      <AnchorProvider value={anchorContextValue}>{children}</AnchorProvider>,
      detached
    );
  }, [anchorContextValue, children]);

  return (
    <>
      {portal}
      <ListPath path={statePinnedPath} onChangePath={handleChangePath} />
      <AnchorProvider value={anchorContextValue}>
        {statePinnedPath.length ? <>{displayedContent}</> : children}
      </AnchorProvider>
    </>
  );
};
