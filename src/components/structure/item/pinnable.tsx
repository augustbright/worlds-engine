import React, { useCallback } from "react";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "components/common/icon-button";
import styled from "styled-components";
import { usePinContext } from "../pin-context";
import { usePathContext } from "../path/path-context";

const StyledButton = styled(IconButton)`
  height: 22px;
  width: 22px;
`;

export const Pinnable: React.FC = ({ children }) => {
  const { path } = usePathContext();
  const { onPinPath } = usePinContext();
  const handleClick = useCallback(() => {
    onPinPath(path);
  }, [onPinPath, path]);

  return (
    <>
      <StyledButton onClick={handleClick} size="xs" icon={faThumbtack} />
      {children}
    </>
  );
};
