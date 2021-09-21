import { IconButton } from "components/common/icon-button";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import { isEqual } from "lodash";
import { useAnchorContext, usePathContext } from "./hooks";
import { PathProvider } from "./path-context";

type Props = {
  path: string;
};

const StyledButton = styled(IconButton)`
  height: 22px;
  width: 22px;
`;

export const Pin: React.FC<Props> = ({ children, path }) => {
  const { path: currentPath } = usePathContext();
  const { onPinPath, pinnedPath, display } = useAnchorContext();
  const handlePin = useCallback(() => {
    onPinPath([...currentPath, path]);
  }, [onPinPath, currentPath, path]);
  const nextPath = useMemo(
    () => ({
      path: [...currentPath, path],
    }),
    [currentPath, path]
  );

  const child = useMemo(
    () => <PathProvider value={nextPath}>{children}</PathProvider>,
    [children, nextPath]
  );

  useEffect(() => {
    if (isEqual(pinnedPath, nextPath.path)) {
      display(child);
    }
  }, [pinnedPath, nextPath, display, child]);

  return (
    <>
      <StyledButton onClick={handlePin} size="xs" icon={faThumbtack} />
      {child}
    </>
  );
};
